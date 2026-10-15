FROM rocker/shiny:4.4.2

RUN install2.r --error --skipinstalled shinydashboard ggplot2 dplyr tidyr \
 && rm -rf /tmp/downloaded_packages

RUN rm -rf /srv/shiny-server/*
COPY app.R /srv/shiny-server/app.R

EXPOSE 3838
CMD ["/usr/bin/shiny-server"]
