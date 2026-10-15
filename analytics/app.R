# PMSG Analytics - Minimal Demo Version
# This standalone file demonstrates the analytics capabilities
# No external files needed - just run: shiny::runApp("pmsg_minimal_demo.R")

library(shiny)
library(shinydashboard)
library(ggplot2)
library(dplyr)
library(tidyr)

# Generate sample data
generate_sample_data <- function() {
  set.seed(42)
  weeks <- 1:8
  participants <- paste0("P", sprintf("%03d", 1:25))
  
  data_list <- list()
  
  for (p in participants) {
    baseline_pain <- runif(1, 5, 9)
    improvement_rate <- runif(1, -0.3, -0.6)
    
    for (w in weeks) {
      pain <- baseline_pain + (improvement_rate * w) + rnorm(1, 0, 0.5)
      pain <- max(0, min(10, pain))
      
      data_list[[length(data_list) + 1]] <- data.frame(
        participant_id = p,
        week = w,
        avg_pain = pain,
        worst_pain = min(10, pain + runif(1, 0.5, 2)),
        pain_interference = pain * 0.8 + rnorm(1, 0, 0.3),
        odi_score = pain * 4 + runif(1, 0, 8),
        attended = sample(c(TRUE, FALSE), 1, prob = c(0.85, 0.15))
      )
    }
  }
  
  bind_rows(data_list)
}

# UI
ui <- dashboardPage(
  dashboardHeader(title = "PMSG Analytics Demo (simulated data)"),
  
  dashboardSidebar(
    sidebarMenu(
      menuItem("Overview", tabName = "overview", icon = icon("dashboard")),
      menuItem("Pain Trends", tabName = "trends", icon = icon("chart-line")),
      menuItem("Statistics", tabName = "stats", icon = icon("calculator")),
      menuItem("Export Data", tabName = "export", icon = icon("download"))
    )
  ),
  
  dashboardBody(
    tags$head(tags$style(HTML("
      .info-box { min-height: 90px; }
      .info-box-icon { height: 90px; line-height: 90px; }
      .info-box-content { padding: 5px 10px; }
    "))),
    
    tabItems(
      # Overview Tab
      tabItem(
        tabName = "overview",
        h2("Pain Management Support Group - Analytics Overview"),
        p(em("All values below are simulated for demonstration. They are not clinical outcomes.")),
        
        fluidRow(
          infoBoxOutput("total_participants"),
          infoBoxOutput("avg_pain_reduction"),
          infoBoxOutput("completion_rate"),
          infoBoxOutput("avg_attendance")
        ),
        
        fluidRow(
          box(
            title = "Pain Progression Over 8 Weeks",
            status = "primary",
            solidHeader = TRUE,
            width = 8,
            plotOutput("pain_timeline", height = 300)
          ),
          box(
            title = "Outcome Distribution",
            status = "success",
            solidHeader = TRUE,
            width = 4,
            plotOutput("outcome_pie", height = 300)
          )
        ),
        
        fluidRow(
          box(
            title = "Weekly Attendance",
            status = "info",
            solidHeader = TRUE,
            width = 6,
            plotOutput("attendance_plot", height = 250)
          ),
          box(
            title = "Summary Statistics",
            status = "warning",
            solidHeader = TRUE,
            width = 6,
            tableOutput("summary_table")
          )
        )
      ),
      
      # Pain Trends Tab
      tabItem(
        tabName = "trends",
        h2("Pain Trajectory Analysis"),
        
        fluidRow(
          box(
            title = "Pain Metric Selection",
            status = "primary",
            solidHeader = TRUE,
            width = 12,
            selectInput("pain_metric", "Select Pain Metric:",
                        choices = c("Average Pain" = "avg_pain",
                                    "Worst Pain" = "worst_pain",
                                    "Pain Interference" = "pain_interference",
                                    "ODI Score" = "odi_score"),
                        selected = "avg_pain")
          )
        ),
        
        fluidRow(
          box(
            title = "Individual Trajectories",
            status = "primary",
            solidHeader = TRUE,
            width = 12,
            plotOutput("individual_trajectories", height = 400)
          )
        ),
        
        fluidRow(
          box(
            title = "Distribution by Week",
            status = "info",
            solidHeader = TRUE,
            width = 6,
            plotOutput("pain_distribution", height = 300)
          ),
          box(
            title = "Mean ± 95% CI",
            status = "success",
            solidHeader = TRUE,
            width = 6,
            plotOutput("pain_ci_plot", height = 300)
          )
        )
      ),
      
      # Statistics Tab
      tabItem(
        tabName = "stats",
        h2("Statistical Analysis"),
        
        fluidRow(
          box(
            title = "Paired t-test (Week 1 vs Week 8)",
            status = "primary",
            solidHeader = TRUE,
            width = 12,
            verbatimTextOutput("ttest_results")
          )
        ),
        
        fluidRow(
          box(
            title = "Before-After Comparison",
            status = "info",
            solidHeader = TRUE,
            width = 6,
            plotOutput("before_after_plot", height = 300)
          ),
          box(
            title = "Effect Size Visualization",
            status = "success",
            solidHeader = TRUE,
            width = 6,
            plotOutput("effect_size_plot", height = 300)
          )
        )
      ),
      
      # Export Tab
      tabItem(
        tabName = "export",
        h2("Export Data & Reports"),
        
        fluidRow(
          box(
            title = "Download Options",
            status = "primary",
            solidHeader = TRUE,
            width = 12,
            downloadButton("download_csv", "Download Data (CSV)", class = "btn-primary"),
            br(), br(),
            p("Click the button above to download the complete dataset including all pain metrics and attendance data.")
          )
        ),
        
        fluidRow(
          box(
            title = "Data Preview",
            status = "info",
            solidHeader = TRUE,
            width = 12,
            tableOutput("data_preview")
          )
        )
      )
    )
  )
)

# Server
server <- function(input, output, session) {
  
  # Generate data once
  data <- generate_sample_data()
  
  # Info boxes
  output$total_participants <- renderInfoBox({
    n <- length(unique(data$participant_id))
    infoBox("Total Participants", n, icon = icon("users"), color = "blue")
  })
  
  output$avg_pain_reduction <- renderInfoBox({
    week1 <- data %>% filter(week == 1) %>% pull(avg_pain) %>% mean()
    week8 <- data %>% filter(week == 8) %>% pull(avg_pain) %>% mean()
    reduction <- round(week1 - week8, 1)
    pct <- round((reduction / week1) * 100, 1)
    infoBox("Avg Pain Reduction", paste0(reduction, " pts (", pct, "%)"), 
            icon = icon("arrow-down"), color = "green")
  })
  
  output$completion_rate <- renderInfoBox({
    completed <- data %>% filter(week == 8) %>% nrow()
    total <- length(unique(data$participant_id))
    rate <- round((completed / total) * 100, 1)
    infoBox("Completion Rate", paste0(rate, "%"), 
            icon = icon("check-circle"), color = "purple")
  })
  
  output$avg_attendance <- renderInfoBox({
    rate <- mean(data$attended) * 100
    infoBox("Avg Attendance", paste0(round(rate, 1), "%"), 
            icon = icon("calendar-check"), color = "yellow")
  })
  
  # Pain timeline
  output$pain_timeline <- renderPlot({
    summary_data <- data %>%
      group_by(week) %>%
      summarise(
        mean_pain = mean(avg_pain, na.rm = TRUE),
        se = sd(avg_pain, na.rm = TRUE) / sqrt(n()),
        .groups = 'drop'
      )
    
    ggplot(summary_data, aes(x = week, y = mean_pain)) +
      geom_ribbon(aes(ymin = mean_pain - 1.96*se, ymax = mean_pain + 1.96*se),
                  alpha = 0.2, fill = "#DC6B4A") +
      geom_line(color = "#DC6B4A", size = 1.5) +
      geom_point(color = "#DC6B4A", size = 3) +
      labs(title = "Average Pain Score Over Time (Mean ± 95% CI)",
           x = "Week", y = "Average Pain Score (0-10)") +
      theme_minimal() +
      theme(plot.title = element_text(face = "bold", size = 14))
  })
  
  # Outcome pie
  output$outcome_pie <- renderPlot({
    outcomes <- data %>%
      filter(week %in% c(1, 8)) %>%
      pivot_wider(id_cols = participant_id, names_from = week, 
                  values_from = avg_pain, names_prefix = "week_") %>%
      mutate(
        reduction = week_1 - week_8,
        outcome = case_when(
          reduction >= 2 ~ "Significant\nImprovement",
          reduction >= 1 ~ "Moderate\nImprovement",
          reduction >= 0 ~ "Mild\nImprovement",
          TRUE ~ "No Change"
        )
      ) %>%
      count(outcome)
    
    ggplot(outcomes, aes(x = "", y = n, fill = outcome)) +
      geom_bar(stat = "identity", width = 1) +
      coord_polar("y") +
      scale_fill_manual(values = c("#48BB78", "#4299E1", "#F6AD55", "#E53E3E")) +
      labs(fill = "Outcome", title = "Clinical Outcomes") +
      theme_void() +
      theme(plot.title = element_text(face = "bold", size = 12, hjust = 0.5))
  })
  
  # Attendance plot
  output$attendance_plot <- renderPlot({
    attendance_data <- data %>%
      group_by(week) %>%
      summarise(rate = mean(attended) * 100, .groups = 'drop')
    
    ggplot(attendance_data, aes(x = week, y = rate)) +
      geom_col(fill = "#2C5F7C", alpha = 0.8) +
      geom_text(aes(label = paste0(round(rate), "%")), vjust = -0.5) +
      labs(title = "Weekly Attendance Rate", x = "Week", y = "Attendance (%)") +
      ylim(0, 100) +
      theme_minimal()
  })
  
  # Summary table
  output$summary_table <- renderTable({
    data %>%
      filter(week %in% c(1, 8)) %>%
      group_by(week) %>%
      summarise(
        `Avg Pain` = round(mean(avg_pain), 2),
        `Worst Pain` = round(mean(worst_pain), 2),
        `ODI Score` = round(mean(odi_score), 1),
        .groups = 'drop'
      ) %>%
      mutate(Week = paste("Week", week)) %>%
      select(Week, everything(), -week)
  })
  
  # Individual trajectories
  output$individual_trajectories <- renderPlot({
    metric_col <- input$pain_metric
    
    ggplot(data, aes(x = week, y = .data[[metric_col]], group = participant_id)) +
      geom_line(alpha = 0.3, color = "#2C5F7C") +
      stat_summary(aes(group = 1), fun = mean, geom = "line", 
                   color = "#DC6B4A", size = 2) +
      labs(title = paste("Individual", gsub("_", " ", tools::toTitleCase(metric_col)), "Trajectories"),
           subtitle = "Bold line shows group mean",
           x = "Week", y = gsub("_", " ", tools::toTitleCase(metric_col))) +
      theme_minimal() +
      theme(plot.title = element_text(face = "bold"))
  })
  
  # Pain distribution
  output$pain_distribution <- renderPlot({
    metric_col <- input$pain_metric
    
    ggplot(data, aes(x = factor(week), y = .data[[metric_col]])) +
      geom_violin(fill = "#4299E1", alpha = 0.6) +
      geom_boxplot(width = 0.2, fill = "white", outlier.shape = NA) +
      labs(title = "Distribution by Week", x = "Week", 
           y = gsub("_", " ", tools::toTitleCase(metric_col))) +
      theme_minimal()
  })
  
  # CI plot
  output$pain_ci_plot <- renderPlot({
    metric_col <- input$pain_metric
    
    summary_data <- data %>%
      group_by(week) %>%
      summarise(
        mean_val = mean(.data[[metric_col]], na.rm = TRUE),
        se = sd(.data[[metric_col]], na.rm = TRUE) / sqrt(n()),
        .groups = 'drop'
      )
    
    ggplot(summary_data, aes(x = week, y = mean_val)) +
      geom_errorbar(aes(ymin = mean_val - 1.96*se, ymax = mean_val + 1.96*se),
                    width = 0.2, color = "#2C5F7C") +
      geom_line(color = "#DC6B4A", size = 1.2) +
      geom_point(color = "#DC6B4A", size = 3) +
      labs(title = "Mean with 95% Confidence Interval", x = "Week",
           y = gsub("_", " ", tools::toTitleCase(metric_col))) +
      theme_minimal()
  })
  
  # T-test results
  output$ttest_results <- renderPrint({
    week1 <- data %>% filter(week == 1) %>% pull(avg_pain)
    week8 <- data %>% filter(week == 8) %>% pull(avg_pain)
    
    test <- t.test(week1, week8, paired = TRUE)
    cohens_d <- (mean(week1) - mean(week8)) / sd(week1 - week8)
    
    cat("Paired t-test: Week 1 vs Week 8 (Average Pain)\n")
    cat("================================================\n\n")
    cat("Week 1 Mean:", round(mean(week1), 2), "\n")
    cat("Week 8 Mean:", round(mean(week8), 2), "\n")
    cat("Mean Difference:", round(mean(week1) - mean(week8), 2), "\n\n")
    cat("t-statistic:", round(test$statistic, 3), "\n")
    cat("p-value:", format.pval(test$p.value, digits = 3), "\n")
    cat("95% CI:", round(test$conf.int[1], 2), "to", round(test$conf.int[2], 2), "\n\n")
    cat("Cohen's d:", round(cohens_d, 3), "\n")
    cat("Effect size:", ifelse(abs(cohens_d) < 0.5, "Small",
                               ifelse(abs(cohens_d) < 0.8, "Medium", "Large")), "\n\n")
    
    if (test$p.value < 0.001) {
      cat("*** Highly significant improvement (p < 0.001) ***\n")
    } else if (test$p.value < 0.05) {
      cat("** Significant improvement (p < 0.05) **\n")
    }
  })
  
  # Before-after plot
  output$before_after_plot <- renderPlot({
    comparison_data <- data %>%
      filter(week %in% c(1, 8)) %>%
      select(participant_id, week, avg_pain) %>%
      pivot_wider(names_from = week, values_from = avg_pain, names_prefix = "week_")
    
    ggplot(comparison_data, aes(x = week_1, y = week_8)) +
      geom_abline(slope = 1, intercept = 0, linetype = "dashed", color = "gray50") +
      geom_point(color = "#DC6B4A", size = 3, alpha = 0.6) +
      geom_smooth(method = "lm", se = FALSE, color = "#2C5F7C") +
      labs(title = "Week 1 vs Week 8 Pain Scores",
           subtitle = "Points below diagonal show improvement",
           x = "Week 1 Pain Score", y = "Week 8 Pain Score") +
      coord_fixed() +
      theme_minimal()
  })
  
  # Effect size plot
  output$effect_size_plot <- renderPlot({
    week1 <- data %>% filter(week == 1) %>% pull(avg_pain)
    week8 <- data %>% filter(week == 8) %>% pull(avg_pain)
    cohens_d <- (mean(week1) - mean(week8)) / sd(week1 - week8)
    
    effect_data <- data.frame(
      metric = "Cohen's d",
      value = cohens_d,
      lower = cohens_d - 0.2,
      upper = cohens_d + 0.2
    )
    
    ggplot(effect_data, aes(x = metric, y = value)) +
      geom_hline(yintercept = c(0.2, 0.5, 0.8), linetype = "dashed", 
                 color = c("gray70", "gray50", "gray30")) +
      geom_errorbar(aes(ymin = lower, ymax = upper), width = 0.2, size = 1) +
      geom_point(size = 5, color = "#DC6B4A") +
      geom_text(aes(label = round(value, 2)), vjust = -1.5, size = 5) +
      annotate("text", x = 1.3, y = 0.2, label = "Small", hjust = 0, color = "gray50") +
      annotate("text", x = 1.3, y = 0.5, label = "Medium", hjust = 0, color = "gray50") +
      annotate("text", x = 1.3, y = 0.8, label = "Large", hjust = 0, color = "gray50") +
      labs(title = "Effect Size (Cohen's d)", y = "Effect Size", x = "") +
      ylim(0, max(1.2, cohens_d + 0.5)) +
      theme_minimal() +
      theme(axis.text.x = element_text(size = 12, face = "bold"))
  })
  
  # Data preview
  output$data_preview <- renderTable({
    head(data %>% arrange(participant_id, week), 20)
  })
  
  # Download handler
  output$download_csv <- downloadHandler(
    filename = function() {
      paste0("pmsg_data_", Sys.Date(), ".csv")
    },
    content = function(file) {
      write.csv(data, file, row.names = FALSE)
    }
  )
}

# Run the app
shinyApp(ui, server)
