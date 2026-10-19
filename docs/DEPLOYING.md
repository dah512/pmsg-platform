# Deploying a container to Cloud Run

The same four steps deploy any of the EDMHS containers. Run them in Terminal on the Mac.

## 0. One-time setup (already done on this Mac)

```bash
gcloud auth login                                   # sign in as dah512@edmhs.us
gcloud auth configure-docker us-central1-docker.pkg.dev
```

When a command says "Reauthentication failed", run `gcloud auth login` again. Google expires the sign-in periodically.

## 1. Build the image for Google's servers

Macs build ARM images by default; Cloud Run runs Intel/AMD (`linux/amd64`).

```bash
cd ~/Projects/pmsg-platform/api
docker buildx build --platform linux/amd64 \
  -t us-central1-docker.pkg.dev/edmhs-web/pmsg/pmsg-api:$(git rev-parse --short HEAD) \
  --push .
```

The tag after the colon is the git commit, so every image traces back to its code.

## 2. Deploy it, private by default

```bash
gcloud run deploy pmsg-api --project edmhs-web --region us-central1 \
  --image us-central1-docker.pkg.dev/edmhs-web/pmsg/pmsg-api:<tag> \
  --no-allow-unauthenticated
```

The first deploy also set the database connection, secret, and service account (see the table below). Later deploys keep those settings; only `--image` changes.

`--no-allow-unauthenticated` means only signed-in Google accounts with permission can reach it. Leave it that way for anything holding participant data or the full curriculum.

## 3. Open a private service from the Mac

```bash
gcloud run services proxy pmsg-api --region us-central1 --project edmhs-web --port 8090
# then browse http://localhost:8090/docs   (Ctrl-C to stop)
```

## 4. Check it

```bash
gcloud run services describe pmsg-api --region us-central1 --project edmhs-web \
  --format='value(status.url,status.latestReadyRevisionName)'
gcloud run services logs read pmsg-api --region us-central1 --project edmhs-web --limit 20
```

To roll back: `gcloud run services update-traffic pmsg-api --to-revisions=<older-revision>=100 --region us-central1 --project edmhs-web`.

## Services and their settings

| Service | Project | Image repository | Database | Access |
| --- | --- | --- | --- | --- |
| pmsg-api | edmhs-web | `us-central1-docker.pkg.dev/edmhs-web/pmsg/pmsg-api` | Cloud SQL `pmsg-db`, secret `pmsg-database-url`, service account `pmsg-api@edmhs-web` | Private |
| ict-curriculum | edmhs-web | `us-central1-docker.pkg.dev/edmhs-web/ict/ict-curriculum` | None | Private |
| kata-api | kata-edmhs | `us-central1-docker.pkg.dev/kata-edmhs/kata/api` | Cloud SQL `kata-db` (run the `kata-migrate` job before deploying a version with a new migration) | Public API; every route except health requires KATA sign-in |
| edmhs-api | edmhs-web | Cloud Run source deploy | None | Public |

## KATA releases need one extra step

A KATA version with a database change is deployed in this order: back up, migrate, deploy.

```bash
gcloud sql backups create --instance kata-db --project kata-edmhs --description "before vX.Y.Z"
gcloud run jobs update kata-migrate --project kata-edmhs --region us-central1 \
  --image us-central1-docker.pkg.dev/kata-edmhs/kata/api:vX.Y.Z
gcloud run jobs execute kata-migrate --project kata-edmhs --region us-central1 --wait
gcloud run services update kata-api --project kata-edmhs --region us-central1 \
  --image us-central1-docker.pkg.dev/kata-edmhs/kata/api:vX.Y.Z
```
