# Build PMSG Platform Book
# Run this script to generate all output formats

# Install required packages if not already installed
required_packages <- c(
  "bookdown", "knitr", "rmarkdown", "tidyverse", "kableExtra",
  "ggplot2", "dplyr", "plotly", "DT"
)

for (pkg in required_packages) {
  if (!require(pkg, character.only = TRUE, quietly = TRUE)) {
    install.packages(pkg)
    library(pkg, character.only = TRUE)
  }
}

cat("\n=== Building PMSG Platform Book ===\n\n")

# Build HTML version (gitbook)
cat("Building HTML version (GitBook)...\n")
bookdown::render_book("index.Rmd", "bookdown::gitbook", quiet = FALSE)
cat("✓ HTML version complete: docs/index.html\n\n")

# Build PDF version
cat("Building PDF version...\n")
bookdown::render_book("index.Rmd", "bookdown::pdf_book", quiet = FALSE)
cat("✓ PDF version complete: docs/_main.pdf\n\n")

# Build EPUB version
cat("Building EPUB version...\n")
bookdown::render_book("index.Rmd", "bookdown::epub_book", quiet = FALSE)
cat("✓ EPUB version complete: docs/_main.epub\n\n")

# Build Word version
cat("Building Word version...\n")
bookdown::render_book("index.Rmd", "bookdown::word_document2", quiet = FALSE)
cat("✓ Word version complete: docs/_main.docx\n\n")

cat("\n=== Build Complete ===\n")
cat("\nOutput files location: docs/\n")
cat("- HTML: docs/index.html\n")
cat("- PDF: docs/_main.pdf\n")
cat("- EPUB: docs/_main.epub\n")
cat("- Word: docs/_main.docx\n\n")

cat("To preview HTML version, open: docs/index.html\n")
cat("To serve locally, run: bookdown::serve_book()\n")
