# PMSG Platform: Comprehensive Guide to Pain Management Support Group Informatics

## 📚 About This Book

This comprehensive guide documents the **Pain Management Support Group (PMSG) Platform** - a world-class clinical informatics system that bridges evidence-based pain management with modern healthcare technology.

### What's Included

**Technical Manual** (Version 1.0)
- Complete documentation for developers and informaticians
- Full-stack architecture details
- API documentation
- Database schemas
- Deployment guides
- Research methodologies

**Multiple Output Formats:**
- 📱 **HTML (GitBook)**: Interactive web version with search
- 📄 **PDF**: Print-ready with professional formatting
- 📖 **EPUB**: E-reader compatible
- 📝 **Word (DOCX)**: Editable format for collaboration

## 🚀 Quick Start

### Prerequisites

You need:
- **R** 4.0 or higher
- **RStudio** (recommended but not required)
- **LaTeX** distribution (for PDF output)
  - Mac: Install MacTeX
  - Windows: Install MiKTeX
  - Linux: `sudo apt-get install texlive-full`

### Building the Book

**Option 1: RStudio** (Easiest)
1. Open `pmsg-book.Rproj` in RStudio
2. Open `index.Rmd`
3. Click "Build Book" button (or Ctrl/Cmd+Shift+B)

**Option 2: Command Line**
```bash
# Navigate to book directory
cd pmsg-book

# Build all formats
Rscript build_book.R

# Or build specific format
R -e "bookdown::render_book('index.Rmd', 'bookdown::gitbook')"
```

**Option 3: R Console**
```r
# Set working directory
setwd("path/to/pmsg-book")

# Build all formats
source("build_book.R")

# Or build specific format
bookdown::render_book("index.Rmd", "bookdown::gitbook")
```

### Viewing the Output

After building:
- **HTML**: Open `docs/index.html` in your browser
- **PDF**: Open `docs/_main.pdf`
- **EPUB**: Transfer `docs/_main.epub` to your e-reader
- **Word**: Open `docs/_main.docx`

## 📖 Book Structure

### Part I: Foundation & Theory
1. **Introduction** - Platform overview, use cases, getting started
2. **Pain Management Background** - Clinical evidence, assessment tools
3. **Platform Architecture** - Technical design, technology stack

### Part II: Clinical Implementation
4. **Installation and Setup** - Deployment, configuration
5. **Patient Registration** - Workflows, assessment administration
6. **Clinical Dashboard** - Real-time monitoring, interpretation

### Part III: Analytics & Research  
7. **Descriptive Analytics** - Pain trends, cohort comparison
8. **Statistical Analysis** - Hypothesis testing, effect sizes
9. **Predictive Analytics** - Machine learning, risk stratification
10. **Survival Analysis** - Retention, time-to-improvement

### Part IV: Advanced Features
11. **RAG System** - AI integration, semantic search
12. **Report Generation** - Automated documentation
13. **R Shiny Suite** - Interactive analytics dashboard

### Part V: Administration & Operations
14. **Data Management** - Security, backup, compliance
15. **User Management** - Roles, permissions, support

### Part VI: Research Applications
16. **Grant Writing Support** - Preliminary data, power analysis
17. **Publication Preparation** - Tables, figures, manuscripts
18. **Quality Improvement** - Benchmarking, continuous improvement

## 🎯 Multiple Versions

This project supports four different audience-specific versions:

### Version 1: Technical Manual (Current)
**Audience**: Developers, informaticians, data scientists

**Focus**: 
- Complete technical documentation
- Code examples and APIs
- Database schemas
- Deployment procedures
- Statistical methods

### Version 2: Clinical User Guide
**Audience**: Physicians, nurses, social workers, facilitators

**Focus**:
- Clinical workflows
- Patient assessment procedures
- Dashboard interpretation
- Report generation
- Troubleshooting

### Version 3: Participant Training Manual
**Audience**: Program participants, patients

**Focus**:
- Program overview
- Assessment completion
- Self-management tools
- Progress tracking
- Simplified language

### Version 4: Executive Overview
**Audience**: Administrators, funders, policymakers

**Focus**:
- Business case and ROI
- Implementation roadmap
- Outcome evidence
- Cost-effectiveness
- Strategic value

*To build alternate versions, see `versions/` directory*

## 📝 Contributing

### Adding Content

1. **New Chapter**: Create `chapters/XX-chapter-name.Rmd`
2. **Add to TOC**: Update `_bookdown.yml` with new chapter
3. **Build**: Run `build_book.R` to compile
4. **Review**: Check output in `docs/`

### Chapter Template

```rmd
# Chapter Title {#chapter-id}

## Section 1

Content here...

### Subsection

More content...

```{r code-chunk, echo=TRUE}
# R code example
library(dplyr)
data %>% summarise(mean_value = mean(value))
```

## References {-}

::: {#refs-chapter}
:::
```

### Adding References

1. **Add to** `book.bib` in BibTeX format:
```bibtex
@article{AuthorYear,
  title={Article Title},
  author={Author, First and Author, Second},
  journal={Journal Name},
  volume={1},
  pages={1--10},
  year={2024}
}
```

2. **Cite in text**: `[@AuthorYear]` or `@AuthorYear`

### Code Style

**R Code**:
```r
# Well-commented, readable code
# Follow tidyverse style guide
library(tidyverse)

# Function with documentation
calculate_score <- function(data) {
  # Calculate composite score
  data %>%
    mutate(score = (metric_1 + metric_2) / 2) %>%
    pull(score)
}
```

**Python Code**:
```python
# PEP 8 compliant
# Type hints where appropriate
def calculate_score(data: pd.DataFrame) -> float:
    """
    Calculate composite score.
    
    Args:
        data: DataFrame with metric columns
        
    Returns:
        Float score value
    """
    return (data['metric_1'] + data['metric_2']) / 2
```

## 🔧 Customization

### Styling

Edit `css/style.css` to customize:
- Color scheme
- Fonts
- Layout
- Callout boxes

### Output Formats

Edit `_output.yml` to modify:
- HTML theme and settings
- PDF LaTeX options
- EPUB metadata
- Word template

### Book Metadata

Edit `index.Rmd` YAML front matter:
- Title and subtitle
- Author information
- Date
- Description
- Cover image

## 🐛 Troubleshooting

### LaTeX Errors (PDF Build)

```bash
# Install TinyTeX (lightweight LaTeX)
R -e "install.packages('tinytex')"
R -e "tinytex::install_tinytex()"
```

### Missing Packages

```r
# Install all required packages
source("install_packages.R")
```

### Build Fails

```r
# Clean and rebuild
bookdown::clean_book()
source("build_book.R")
```

### Figures Not Showing

- Check file paths in R code chunks
- Ensure images are in `images/` directory
- Verify `out.width` and other chunk options

## 📦 Project Structure

```
pmsg-book/
├── index.Rmd                 # Front matter, preface
├── _bookdown.yml            # Book configuration
├── _output.yml              # Output formats
├── book.bib                 # Bibliography
├── build_book.R             # Build script
├── pmsg-book.Rproj          # RStudio project
│
├── chapters/                # Book chapters
│   ├── 01-introduction.Rmd
│   ├── 02-pain-management-background.Rmd
│   ├── 03-architecture.Rmd
│   └── ...
│
├── css/                     # Custom styling
│   └── style.css
│
├── images/                  # Figures and images
│   ├── pmsg_cover.png
│   └── ...
│
├── data/                    # Sample datasets
│   └── ...
│
├── versions/                # Alternate versions
│   ├── clinical/           # Clinical user guide
│   ├── participant/        # Participant manual
│   └── executive/          # Executive overview
│
└── docs/                    # Build output (generated)
    ├── index.html          # HTML version
    ├── _main.pdf           # PDF version
    ├── _main.epub          # EPUB version
    └── _main.docx          # Word version
```

## 📄 License

**Book License**: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

**Code License**: MIT License

**Clinical Content**: For educational and research purposes. Always consult qualified healthcare providers for patient care decisions.

## 👥 Authors

**Darrell A. Henderson, MD, MS**
- Physician with 14 years clinical practice
- Former USAF officer (9 years service)
- MS in Computer Information Systems
- PhD candidate in Bioengineering

## 📧 Contact

- **Email**: dah512@example.com
- **GitHub**: https://github.com/yourusername/pmsg-platform
- **Issues**: https://github.com/yourusername/pmsg-platform/issues

## 🙏 Acknowledgments

This work builds on:
- Open source communities (R, Python, React, PostgreSQL)
- Clinical research in pain management
- Biomedical informatics pioneers
- Patients who inspire this work

---

**Ready to build something amazing? Let's go!** 🚀
