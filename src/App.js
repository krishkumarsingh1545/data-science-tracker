import React, { useState, useEffect, useMemo } from 'react';
import { 
  Map, 
  ListChecks, 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Circle,
  PlayCircle,
  FileText,
  HelpCircle,
  Trophy
} from 'lucide-react';

// --- DATA EXTRACTION FROM HTML ---
const ROADMAP_DATA = [
  {
    id: 'p1', num: '01', title: 'Python for Data Science', tag: 'FOUNDATION — THE LANGUAGE', color: 'text-[#f0c040]', bg: 'bg-[#f0c040]/10', border: 'border-[#f0c040]',
    topics: [
      {
        id: 'p1-t1', title: 'Python Data Structures & Control Flow', icon: '🐍',
        subtopics: [
          { id: 'p1-t1-s1', title: 'Lists & Tuples' }, { id: 'p1-t1-s2', title: 'Dicts & Sets' },
          { id: 'p1-t1-s3', title: 'List Comprehensions' }, { id: 'p1-t1-s4', title: 'Dict Comprehensions' },
          { id: 'p1-t1-s5', title: 'Loops & Conditionals' }, { id: 'p1-t1-s6', title: 'Zip, Enumerate, Map, Filter' },
          { id: 'p1-t1-s7', title: 'Lambda Functions' }, { id: 'p1-t1-s8', title: 'Error Handling (try/except)' }
        ]
      },
      {
        id: 'p1-t2', title: 'Functions, OOP & File I/O', icon: '⚙️',
        subtopics: [
          { id: 'p1-t2-s1', title: '*args & **kwargs' }, { id: 'p1-t2-s2', title: 'Decorators' },
          { id: 'p1-t2-s3', title: 'Generators & Iterators' }, { id: 'p1-t2-s4', title: 'Classes & Objects' },
          { id: 'p1-t2-s5', title: 'Inheritance' }, { id: 'p1-t2-s6', title: 'Dunder Methods' },
          { id: 'p1-t2-s7', title: 'Reading CSV/JSON files' }, { id: 'p1-t2-s8', title: 'Context Managers (with)' }
        ]
      }
    ]
  },
  {
    id: 'p2', num: '02', title: 'NumPy & Pandas', tag: 'TOOLS — THE WORKBENCH', color: 'text-[#3ddc97]', bg: 'bg-[#3ddc97]/10', border: 'border-[#3ddc97]',
    topics: [
      {
        id: 'p2-t1', title: 'NumPy — Arrays & Operations', icon: '🔢',
        subtopics: [
          { id: 'p2-t1-s1', title: 'ndarray creation' }, { id: 'p2-t1-s2', title: 'Shape & Reshaping' },
          { id: 'p2-t1-s3', title: 'Indexing & Slicing' }, { id: 'p2-t1-s4', title: 'Boolean Masking' },
          { id: 'p2-t1-s5', title: 'Vectorized Operations' }, { id: 'p2-t1-s6', title: 'Broadcasting' },
          { id: 'p2-t1-s7', title: 'Linear Algebra (dot, matmul)' }, { id: 'p2-t1-s8', title: 'Random Module' },
          { id: 'p2-t1-s9', title: 'Aggregations (sum, mean, std)' }
        ]
      },
      {
        id: 'p2-t2', title: 'Pandas — Data Wrangling', icon: '🐼',
        subtopics: [
          { id: 'p2-t2-s1', title: 'Series & DataFrame' }, { id: 'p2-t2-s2', title: 'Reading CSV/Excel/JSON' },
          { id: 'p2-t2-s3', title: 'iloc vs loc' }, { id: 'p2-t2-s4', title: 'Filtering & Masking' },
          { id: 'p2-t2-s5', title: 'Handling NaN values' }, { id: 'p2-t2-s6', title: 'groupby & agg' },
          { id: 'p2-t2-s7', title: 'merge, join, concat' }, { id: 'p2-t2-s8', title: 'apply & map' },
          { id: 'p2-t2-s9', title: 'pivot_table' }, { id: 'p2-t2-s10', title: 'Time Series basics' },
          { id: 'p2-t2-s11', title: 'String operations (.str)' }
        ]
      }
    ]
  },
  {
    id: 'p3', num: '03', title: 'Statistics & Probability', tag: 'THEORY — THE ENGINE', color: 'text-[#7c9fff]', bg: 'bg-[#7c9fff]/10', border: 'border-[#7c9fff]',
    topics: [
      {
        id: 'p3-t1', title: 'Descriptive Statistics', icon: '📊',
        subtopics: [
          { id: 'p3-t1-s1', title: 'Mean, Median, Mode' }, { id: 'p3-t1-s2', title: 'Variance & Std Deviation' },
          { id: 'p3-t1-s3', title: 'Percentiles & IQR' }, { id: 'p3-t1-s4', title: 'Skewness & Kurtosis' },
          { id: 'p3-t1-s5', title: 'Correlation (Pearson, Spearman)' }, { id: 'p3-t1-s6', title: 'Covariance' },
          { id: 'p3-t1-s7', title: 'Outlier Detection (IQR method, Z-score)' }
        ]
      },
      {
        id: 'p3-t2', title: 'Probability & Distributions', icon: '🎲',
        subtopics: [
          { id: 'p3-t2-s1', title: 'Probability basics' }, { id: 'p3-t2-s2', title: "Bayes' Theorem" },
          { id: 'p3-t2-s3', title: 'Normal Distribution' }, { id: 'p3-t2-s4', title: 'Binomial Distribution' },
          { id: 'p3-t2-s5', title: 'Poisson Distribution' }, { id: 'p3-t2-s6', title: 'Central Limit Theorem' },
          { id: 'p3-t2-s7', title: 'Confidence Intervals' }, { id: 'p3-t2-s8', title: 'Hypothesis Testing (t-test, chi-square)' },
          { id: 'p3-t2-s9', title: 'p-values' }
        ]
      }
    ]
  },
  {
    id: 'p4', num: '04', title: 'Data Visualization', tag: 'CREATIVE — YOUR STRENGTH', color: 'text-[#ff6b6b]', bg: 'bg-[#ff6b6b]/10', border: 'border-[#ff6b6b]',
    topics: [
      {
        id: 'p4-t1', title: 'Matplotlib — The Foundation', icon: '📈',
        subtopics: [
          { id: 'p4-t1-s1', title: 'Figure & Axes architecture' }, { id: 'p4-t1-s2', title: 'Line, Bar, Scatter, Histogram' },
          { id: 'p4-t1-s3', title: 'Subplots' }, { id: 'p4-t1-s4', title: 'Color & Styling' },
          { id: 'p4-t1-s5', title: 'Annotations & Labels' }, { id: 'p4-t1-s6', title: 'Saving figures (savefig)' }
        ]
      },
      {
        id: 'p4-t2', title: 'Seaborn — Statistical Visuals', icon: '🎨',
        subtopics: [
          { id: 'p4-t2-s1', title: 'scatterplot, lineplot' }, { id: 'p4-t2-s2', title: 'histplot, kdeplot' },
          { id: 'p4-t2-s3', title: 'boxplot, violinplot' }, { id: 'p4-t2-s4', title: 'heatmap (correlation matrix)' },
          { id: 'p4-t2-s5', title: 'pairplot' }, { id: 'p4-t2-s6', title: 'FacetGrid' },
          { id: 'p4-t2-s7', title: 'Themes & Palettes' }
        ]
      },
      {
        id: 'p4-t3', title: 'Plotly — Interactive Visuals', icon: '🌐',
        subtopics: [
          { id: 'p4-t3-s1', title: 'plotly.express basics' }, { id: 'p4-t3-s2', title: 'Interactive scatter, bar, line' },
          { id: 'p4-t3-s3', title: 'Animated charts' }, { id: 'p4-t3-s4', title: 'Choropleth maps' },
          { id: 'p4-t3-s5', title: 'Dash basics (optional)' }
        ]
      }
    ]
  },
  {
    id: 'p5', num: '05', title: 'SQL for Data Science', tag: 'DATA ACCESS — THE VAULT', color: 'text-[#c89bff]', bg: 'bg-[#c89bff]/10', border: 'border-[#c89bff]',
    topics: [
      {
        id: 'p5-t1', title: 'SQL Fundamentals to Advanced', icon: '🗄️',
        subtopics: [
          { id: 'p5-t1-s1', title: 'SELECT, WHERE, ORDER BY' }, { id: 'p5-t1-s2', title: 'GROUP BY + HAVING' },
          { id: 'p5-t1-s3', title: 'JOINs (INNER, LEFT, RIGHT, FULL)' }, { id: 'p5-t1-s4', title: 'Subqueries' },
          { id: 'p5-t1-s5', title: 'Window Functions (ROW_NUMBER, RANK)' }, { id: 'p5-t1-s6', title: 'CTEs (WITH clause)' },
          { id: 'p5-t1-s7', title: 'CASE WHEN' }, { id: 'p5-t1-s8', title: 'Date functions' },
          { id: 'p5-t1-s9', title: 'Aggregate functions' }
        ]
      }
    ]
  },
  {
    id: 'p6', num: '06', title: 'Machine Learning', tag: 'THE MAIN EVENT', color: 'text-[#f0c040]', bg: 'bg-[#f0c040]/10', border: 'border-[#f0c040]',
    topics: [
      {
        id: 'p6-t1', title: 'ML Fundamentals & Scikit-Learn', icon: '🔍',
        subtopics: [
          { id: 'p6-t1-s1', title: 'Supervised vs Unsupervised' }, { id: 'p6-t1-s2', title: 'Train/Test Split' },
          { id: 'p6-t1-s3', title: 'Cross-validation' }, { id: 'p6-t1-s4', title: 'Feature Scaling' },
          { id: 'p6-t1-s5', title: 'Feature Encoding' }, { id: 'p6-t1-s6', title: 'Pipeline' },
          { id: 'p6-t1-s7', title: 'Overfitting & Underfitting' }, { id: 'p6-t1-s8', title: 'Bias-Variance Tradeoff' },
          { id: 'p6-t1-s9', title: 'Hyperparameter Tuning' }
        ]
      },
      {
        id: 'p6-t2', title: 'Key Algorithms (one by one)', icon: '🌲',
        subtopics: [
          { id: 'p6-t2-s1', title: 'Linear Regression' }, { id: 'p6-t2-s2', title: 'Logistic Regression' },
          { id: 'p6-t2-s3', title: 'Decision Trees' }, { id: 'p6-t2-s4', title: 'Random Forest' },
          { id: 'p6-t2-s5', title: 'Gradient Boosting (XGBoost)' }, { id: 'p6-t2-s6', title: 'K-Nearest Neighbors' },
          { id: 'p6-t2-s7', title: 'Support Vector Machines' }, { id: 'p6-t2-s8', title: 'K-Means Clustering' },
          { id: 'p6-t2-s9', title: 'PCA (Dimensionality Reduction)' }, { id: 'p6-t2-s10', title: 'Naive Bayes' }
        ]
      },
      {
        id: 'p6-t3', title: 'Model Evaluation & Metrics', icon: '📐',
        subtopics: [
          { id: 'p6-t3-s1', title: 'Confusion Matrix' }, { id: 'p6-t3-s2', title: 'Accuracy, Precision, Recall, F1' },
          { id: 'p6-t3-s3', title: 'ROC-AUC Curve' }, { id: 'p6-t3-s4', title: 'MAE, MSE, RMSE, R²' },
          { id: 'p6-t3-s5', title: 'Log Loss' }, { id: 'p6-t3-s6', title: 'Learning Curves' },
          { id: 'p6-t3-s7', title: 'Classification Report' }
        ]
      }
    ]
  },
  {
    id: 'p7', num: '07', title: 'Deep Learning', tag: 'FRONTIER — THE FUTURE', color: 'text-[#3ddc97]', bg: 'bg-[#3ddc97]/10', border: 'border-[#3ddc97]',
    topics: [
      {
        id: 'p7-t1', title: 'Neural Networks & PyTorch/Keras', icon: '🧠',
        subtopics: [
          { id: 'p7-t1-s1', title: 'Perceptron & Activation functions' }, { id: 'p7-t1-s2', title: 'Forward & Backpropagation' },
          { id: 'p7-t1-s3', title: 'Gradient Descent variants' }, { id: 'p7-t1-s4', title: 'Keras Sequential API' },
          { id: 'p7-t1-s5', title: 'Loss functions & Optimizers' }, { id: 'p7-t1-s6', title: 'Dropout & Regularization' },
          { id: 'p7-t1-s7', title: 'Batch Normalization' }, { id: 'p7-t1-s8', title: 'CNNs for Image data' },
          { id: 'p7-t1-s9', title: 'RNNs & LSTMs' }, { id: 'p7-t1-s10', title: 'Transfer Learning' }
        ]
      }
    ]
  }
];

const PROJECTS_DATA = [
  { id: 'proj1', num: 'PROJECT 01', title: 'Exploratory Data Analysis Report', desc: 'Pick any Kaggle dataset (start with Titanic or IPL Cricket). Write a full EDA: distributions, missing values, correlations, outliers, and 10+ charts.', tags: ['Pandas', 'Seaborn', 'Statistics', 'Storytelling'], color: 'border-[#f0c040]' },
  { id: 'proj2', num: 'PROJECT 02', title: 'Interactive Dashboard', desc: 'Build an interactive Plotly dashboard on COVID-19 or IPL data. Include filters, animated timelines, and geographic maps. Deploy it using Streamlit.', tags: ['Plotly', 'Streamlit', 'Pandas', 'Deployment'], color: 'border-[#3ddc97]' },
  { id: 'proj3', num: 'PROJECT 03', title: 'End-to-End ML Pipeline', desc: 'Predict house prices or customer churn. Full pipeline: EDA → feature engineering → model selection → hyperparameter tuning → model explanation with SHAP.', tags: ['Scikit-learn', 'XGBoost', 'SHAP', 'Pipeline'], color: 'border-[#7c9fff]' },
  { id: 'proj4', num: 'PROJECT 04', title: 'NLP Sentiment Analyzer', desc: 'Scrape or use IMDb/Twitter reviews. Build a sentiment classification model. Start with TF-IDF + LogReg, then improve with a pre-trained transformer.', tags: ['NLP', 'TF-IDF', 'HuggingFace', 'Text Data'], color: 'border-[#ff6b6b]' },
  { id: 'proj5', num: 'PROJECT 05', title: 'Deep Learning Image Classifier', desc: 'Build a CNN to classify plant diseases, or fine-tune a pretrained model. Deploy it as a web app using Gradio or Streamlit with a real upload interface.', tags: ['Keras/PyTorch', 'Transfer Learning', 'Gradio', 'Deployment'], color: 'border-[#c89bff]' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [completedSubtopics, setCompletedSubtopics] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});

  // Load progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('krish_ds_progress');
    if (saved) {
      try { setCompletedSubtopics(JSON.parse(saved)); } catch (e) { console.error('Error loading progress'); }
    }
  }, []);

  // Save progress when it changes
  useEffect(() => {
    localStorage.setItem('krish_ds_progress', JSON.stringify(completedSubtopics));
  }, [completedSubtopics]);

  const toggleSubtopic = (id) => {
    setCompletedSubtopics(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAccordion = (id) => {
    setExpandedTopics(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Calculate Progress Stats
  const stats = useMemo(() => {
    let total = 0;
    let completed = 0;
    ROADMAP_DATA.forEach(phase => {
      phase.topics.forEach(topic => {
        topic.subtopics.forEach(sub => {
          total++;
          if (completedSubtopics[sub.id]) completed++;
        });
      });
    });
    return { total, completed, percent: total === 0 ? 0 : Math.round((completed / total) * 100) };
  }, [completedSubtopics]);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#e8eaf0] font-sans pb-24 selection:bg-[#f0c040] selection:text-[#0a0c10]">
      {/* NOISE OVERLAY */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      ></div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#0a0c10]/90 backdrop-blur-md border-b border-[#1e2535] px-4 py-3 shadow-lg shadow-black/20">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#f0c040] mb-0.5">// KRISH'S ROADMAP</div>
            <h1 className="text-xl font-bold font-serif tracking-tight">Data Science Tracker</h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-mono text-[#6b7594]">{stats.completed} / {stats.total} Tasks</span>
            <div className="w-20 h-1.5 bg-[#161b26] rounded-full mt-1 overflow-hidden border border-[#1e2535]">
              <div 
                className="h-full bg-gradient-to-r from-[#f0c040] to-[#3ddc97] transition-all duration-500 ease-out" 
                style={{ width: `${stats.percent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-2xl mx-auto px-4 pt-6 relative z-10">
        {activeTab === 'roadmap' && <RoadmapView expandedTopics={expandedTopics} toggleAccordion={toggleAccordion} completedSubtopics={completedSubtopics} />}
        {activeTab === 'todo' && <TodoView completedSubtopics={completedSubtopics} toggleSubtopic={toggleSubtopic} stats={stats} />}
        {activeTab === 'projects' && <ProjectsView />}
      </main>

      {/* BOTTOM NAVIGATION (ANDROID STYLE) */}
      <nav className="fixed bottom-0 w-full bg-[#10141c] border-t border-[#1e2535] z-50 pb-safe">
        <div className="flex justify-around items-center max-w-2xl mx-auto py-2">
          <NavItem 
            icon={<Map size={24} />} 
            label="Roadmap" 
            isActive={activeTab === 'roadmap'} 
            onClick={() => setActiveTab('roadmap')} 
          />
          <NavItem 
            icon={<ListChecks size={24} />} 
            label="Tracker" 
            isActive={activeTab === 'todo'} 
            onClick={() => setActiveTab('todo')} 
            badge={stats.completed < stats.total ? `${stats.percent}%` : '✓'}
          />
          <NavItem 
            icon={<Briefcase size={24} />} 
            label="Projects" 
            isActive={activeTab === 'projects'} 
            onClick={() => setActiveTab('projects')} 
          />
        </div>
      </nav>
    </div>
  );
}

/* =========================================
   COMPONENTS 
   ========================================= */

// Bottom Nav Item Component
function NavItem({ icon, label, isActive, onClick, badge }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center w-full py-2 transition-colors ${isActive ? 'text-[#f0c040]' : 'text-[#6b7594] hover:text-[#e8eaf0]'}`}>
      <div className={`transition-transform duration-200 ${isActive ? 'scale-110 mb-1' : 'mb-1'}`}> 
        {icon}
      </div>
      <span className="text-[10px] font-mono tracking-wide">{label}</span>
      {badge && (
        <span className="absolute top-0 right-1/4 bg-[#1e2535] text-[9px] px-1.5 py-0.5 rounded-full border border-[#1e2535] text-[#3ddc97] font-mono">
          {badge}
        </span>
      )}
    </button>
  );
}

// 1. ROADMAP VIEW
function RoadmapView({ expandedTopics, toggleAccordion, completedSubtopics }) {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="bg-[#10141c] border-l-4 border-[#f0c040] border-y border-r border-y-[#1e2535] border-r-[#1e2535] p-5 rounded-r-lg relative overflow-hidden">
        <div className="absolute top-3 right-4 text-[10px] font-mono text-[#6b7594] tracking-widest">// README</div>
        <h2 className="text-lg font-bold text-[#f0c040] mb-2 font-serif">How to use this app</h2>
        <p className="text-sm text-[#6b7594] leading-relaxed mb-3">
          This is your interactive path to mastering Data Science. Read the roadmap here, then switch to the <strong className="text-[#e8eaf0]">Tracker</strong> tab to check off concepts as you learn them.
        </p>
      </div>

      {ROADMAP_DATA.map((phase) => (
        <div key={phase.id} className="relative">
          {/* Phase Header */}
          <div className="flex items-start gap-4 mb-5 border-b border-[#1e2535] pb-4">
            <div className={`text-4xl font-light font-mono opacity-20 mt-1 ${phase.color}`}>{phase.num}</div>
            <div>
              <div className={`text-[9px] font-mono tracking-widest uppercase mb-1 ${phase.color}`}>{phase.tag}</div>
              <h2 className="text-2xl font-bold font-serif leading-tight">{phase.title}</h2>
            </div>
          </div>

          {/* Topics Accordion */}
          <div className="space-y-3">
            {phase.topics.map((topic) => {
              const isExpanded = expandedTopics[topic.id];
              const completedCount = topic.subtopics.filter(s => completedSubtopics[s.id]).length;
              const isAllDone = completedCount === topic.subtopics.length && topic.subtopics.length > 0;

              return (
                <div key={topic.id} className={`bg-[#10141c] border transition-colors rounded-md overflow-hidden ${isExpanded ? 'border-[#f0c040]/40' : 'border-[#1e2535]'}`}> 
                  {/* Accordion Header */}
                  <button 
                    onClick={() => toggleAccordion(topic.id)}
                    className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-[#161b26] transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-md flex items-center justify-center text-lg shrink-0 ${phase.bg}}>
                      {topic.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold font-serif text-[15px] ${isAllDone ? 'text-[#6b7594] line-through' : 'text-[#e8eaf0]'}`}>{topic.title}</h3>
                      <div className="text-[10px] font-mono text-[#6b7594] mt-0.5">{completedCount} / {topic.subtopics.length} SUBTOPICS</div>
                    </div>
                    <div className="text-[#6b7594]">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-[#1e2535]/50 bg-[#0a0c10]/30 animate-slide-down">
                      <div className="flex flex-wrap gap-2 mt-3">
                        {topic.subtopics.map(sub => (
                          <span 
                            key={sub.id} 
                            className={`text-[11px] font-mono px-2.5 py-1 border rounded-sm transition-colors
                              ${completedSubtopics[sub.id] 
                                ? 'bg-[#3ddc97]/10 border-[#3ddc97]/30 text-[#3ddc97]' 
                                : 'bg-[#1a2030] border-[#1e2535] text-[#e8eaf0]'}`}
                          >
                            {sub.title}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-center">
                        <span className="text-xs text-[#6b7594] font-mono border-b border-dashed border-[#6b7594] pb-0.5">Go to Tracker Tab to mark complete</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// 2. TODO / TRACKER VIEW
function TodoView({ completedSubtopics, toggleSubtopic, stats }) {
  return (
    <div className="animate-fade-in pb-6">
      <div className="bg-[#10141c] border border-[#1e2535] p-5 rounded-lg mb-8 text-center relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#3ddc97] opacity-10 blur-2xl rounded-full"></div>
        
        <Trophy className="w-10 h-10 mx-auto text-[#f0c040] mb-3" />
        <h2 className="text-3xl font-bold font-mono mb-1">{stats.percent}%</h2>
        <p className="text-sm font-mono text-[#6b7594] uppercase tracking-widest">Global Progress</p>
      </div>

      <div className="space-y-8">
        {ROADMAP_DATA.map(phase => {
          // Check phase completion
          let phaseTotal = 0;
          let phaseDone = 0;
          phase.topics.forEach(t => {
            t.subtopics.forEach(s => {
              phaseTotal++;
              if (completedSubtopics[s.id]) phaseDone++;
            });
          });
          const phasePercent = phaseTotal === 0 ? 0 : Math.round((phaseDone / phaseTotal) * 100);

          return (
            <div key={phase.id} className="relative">
              <div className="sticky top-[60px] z-30 bg-[#0a0c10]/95 backdrop-blur-sm py-2 mb-3 border-b border-[#1e2535] flex justify-between items-end">
                <h3 className="font-serif font-bold text-lg flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1e2535] ${phase.color}`}>{phase.num}</span>
                  {phase.title}
                </h3>
                <span className="text-xs font-mono text-[#6b7594]">{phasePercent}%</span>
              </div>

              <div className="space-y-4">
                {phase.topics.map(topic => (
                  <div key={topic.id} className="bg-[#161b26] rounded-md border border-[#1e2535] p-3">
                    <div className="flex items-center gap-2 mb-3 border-b border-[#1e2535] pb-2">
                      <span className="text-base">{topic.icon}</span>
                      <h4 className="font-bold text-sm text-[#e8eaf0]">{topic.title}</h4>
                    </div>
                    
                    <div className="space-y-1">
                      {topic.subtopics.map(sub => {
                        const isDone = !!completedSubtopics[sub.id];
                        return (
                          <button
                            key={sub.id}
                            onClick={() => toggleSubtopic(sub.id)}
                            className="w-full flex items-start gap-3 p-2 hover:bg-[#1a2030] rounded-sm transition-colors text-left group"
                          >
                            <div className={`mt-0.5 shrink-0 transition-colors ${isDone ? 'text-[#3ddc97]' : 'text-[#6b7594] group-hover:text-[#f0c040]'}`}> 
                              {isDone ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                            </div>
                            <span className={`text-sm leading-snug transition-colors ${isDone ? 'text-[#6b7594] line-through' : 'text-[#e8eaf0]'}`}> 
                              {sub.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 3. PROJECTS VIEW
function ProjectsView() {
  return (
    <div className="animate-fade-in pb-6">
      <div className="text-center mb-8 pt-4">
        <h2 className="text-2xl font-bold font-serif mb-2 text-[#e8eaf0]">Capstone Projects</h2>
        <p className="text-[#6b7594] text-sm font-mono">Portfolio building is non-negotiable.</p>
      </div>

      <div className="space-y-4">
        {PROJECTS_DATA.map((proj, idx) => (
          <div key={proj.id} className={`bg-[#10141c] border border-[#1e2535] border-l-4 ${proj.color} p-5 rounded-r-lg relative hover:-translate-y-1 transition-transform duration-300`}> 
            <div className="text-[10px] font-mono text-[#6b7594] mb-2">{proj.num}</div>
            <h3 className="text-lg font-bold font-serif text-[#e8eaf0] mb-2">{proj.title}</h3>
            <p className="text-sm text-[#8a94b5] leading-relaxed mb-4">{proj.desc}</p>
            <div className="flex flex-wrap gap-2">
              {proj.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono border border-[#1e2535] bg-[#1a2030] text-[#6b7594] px-2 py-0.5 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#7c9fff]/10 border border-[#7c9fff]/20 p-5 rounded-lg text-sm text-[#8a94b5] leading-relaxed relative">
        <HelpCircle className="absolute -top-3 left-4 text-[#7c9fff] bg-[#0a0c10] w-6 h-6" />
        <strong className="text-[#7c9fff] block mb-1">Where to find datasets?</strong>
        Always start with real datasets. Best free sources: Kaggle Datasets, Google Dataset Search, data.gov.in, and Awesome Public Datasets on GitHub.
      </div>
    </div>
  );
}

/* Add some minimal custom CSS for animations */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
  .animate-slide-down { animation: slideDown 0.2s ease-out forwards; }
  .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
`;
document.head.appendChild(style);