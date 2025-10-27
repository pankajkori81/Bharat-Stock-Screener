

import React, { useState, useEffect, useContext } from 'react';
import SEO from '../components/SEO';
import { TrendingUp, Shield, DollarSign, BarChart3, Droplets, Award, Moon, Sun, Download, RefreshCw, AlertCircle, History, FileText, Trash2, Upload } from 'lucide-react';
 import StockImg from "/src/assets/bharat-stock-screener.png";
import { ThemeContext } from '../context/ThemeContext';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('calculator');
const { isDark } = useContext(ThemeContext);
  

  const [stockName, setStockName] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const scoringConfig = {
    basic: {
      weight: 15,
      icon: Award,
      color: 'from-indigo-500 to-purple-600',
      darkColor: 'from-indigo-600 to-purple-700',
      parameters: [
        { name: 'Market Cap > ₹1000 Cr', points: 4, critical: true },
        { name: 'Promoter Holding > 50-60%', points: 5, critical: true },
        { name: 'Face Value > 1', points: 3, critical: false },
        { name: 'DII + FII Holding > 10% ' , points:3 , critical: false}              
      ]
    },
    profitability: {
      weight: 25,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
      darkColor: 'from-green-600 to-emerald-700',
      parameters: [
        { name: 'ROE > 15%', points: 8, critical: true },
        { name: 'ROCE > 20%', points: 8, critical: true },
        { name: 'Operating Margin > 10%', points: 6, critical: true },
        { name: 'Net Profit Margin > 5%', points: 3, critical: false }
      ]
    },
    financialHealth: {
      weight: 20,
      icon: Shield,
      color: 'from-blue-500 to-indigo-600',
      darkColor: 'from-blue-600 to-indigo-700',
      parameters: [
        { name: 'Debt/Equity < 0.5', points: 7, critical: true },
        { name: 'Interest Coverage > 3', points: 6, critical: true },
        { name: 'Current Ratio > 1.5', points: 4, critical: false },
        { name: 'Quick Ratio > 1', points: 3, critical: false },

      
      ]
    },
    valuation: {
      weight: 20,
      icon: DollarSign,
      color: 'from-purple-500 to-pink-600',
      darkColor: 'from-purple-600 to-pink-700',
      parameters: [
        { name: 'P/E < 25', points: 7, critical: true },
        { name: 'P/B < 3', points: 4, critical: true },
        { name: 'Dividend Yield > 1% ', points: 4, critical: false },
        { name: 'EV/EBITDA < 15', points: 5, critical: false }
      ]
    },
    growth: {
      weight: 10,
      icon: BarChart3,
      color: 'from-orange-500 to-red-600',
      darkColor: 'from-orange-600 to-red-700',
      parameters: [
        { name: 'Profit Growth 3Y > 15%', points: 5, critical: true },
        { name: 'Sales Growth 3Y > 15%', points: 5, critical: false }
      ]
    },
    cashFlow: {
      weight: 10,
      icon: Droplets,
      color: 'from-cyan-500 to-blue-600',
      darkColor: 'from-cyan-600 to-blue-700',
      parameters: [
        { name: 'OCF Positive (3Y)', points: 5, critical: true },
        { name: 'OCF/Net Profit > 0.80', points: 5, critical: true },
      
      ]
    }
  };

  const [scores, setScores] = useState(() => {
    const initial = {};
    Object.keys(scoringConfig).forEach(category => {
      initial[category] = {};
      scoringConfig[category].parameters.forEach((param, idx) => {
        initial[category][idx] = false;
      });
    });
    return initial;
  });

  useEffect(() => {
    const savedHistory = window.localStorage.getItem('stockAnalysisHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  }, []);

  const toggleScore = (category, paramIdx) => {
    setScores(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [paramIdx]: !prev[category][paramIdx]
      }
    }));
  };

  const calculateCategoryScore = (category) => {
    const config = scoringConfig[category];
    const totalPoints = config.parameters.reduce((sum, p) => sum + p.points, 0);
    const earnedPoints = config.parameters.reduce((sum, p, idx) => 
      sum + (scores[category][idx] ? p.points : 0), 0);
    return (earnedPoints / totalPoints) * config.weight;
  };

  const calculateTotalScore = () => {
    return Object.keys(scoringConfig).reduce((sum, cat) => 
      sum + calculateCategoryScore(cat), 0);
  };

  const getRecommendation = (score) => {
    if (score >= 85) return { text: 'STRONG BUY', color: isDark ? 'text-green-400' : 'text-green-600', bg: isDark ? 'bg-green-900/30' : 'bg-green-50', emoji: '🟢', desc: 'Exceptional quality stock' };
    if (score >= 70) return { text: 'BUY', color: isDark ? 'text-green-400' : 'text-green-500', bg: isDark ? 'bg-green-900/30' : 'bg-green-50', emoji: '🟢', desc: 'High quality investment' };
    if (score >= 55) return { text: 'HOLD', color: isDark ? 'text-yellow-400' : 'text-yellow-600', bg: isDark ? 'bg-yellow-900/30' : 'bg-yellow-50', emoji: '🟡', desc: 'Average quality, monitor closely' };
    return { text: 'SELL', color: isDark ? 'text-red-400' : 'text-red-600', bg: isDark ? 'bg-red-900/30' : 'bg-red-50', emoji: '🔴', desc: 'Poor quality, avoid or exit' };
  };

  const totalScore = calculateTotalScore();
  const recommendation = getRecommendation(totalScore);

  // const passedParams = Object.keys(scores).reduce((sum, cat) => 
  //   sum + Object.values(scores[cat]).filter(Boolean).length, 0);

  const passedParams = Object.entries(scores).reduce(
  (sum, [cat, paramObj]) =>
    sum +
    Object.entries(paramObj).filter(
      ([idx, val]) => val && scoringConfig[cat].parameters[idx]
    ).length,
  0
);

  // const totalParams = Object.keys(scoringConfig).reduce((sum, cat) => 
  //   sum + scoringConfig[cat].parameters.length, 0);

  const totalParams = Object.values(scoringConfig).reduce(
  (sum, config) => sum + config.parameters.length,
  0
);


  const saveToHistory = () => {
    if (!stockName.trim()) {
      alert('Please enter a stock name before saving!');
      return;
    }

    const analysis = {
      id: Date.now(),
      stockName,
      totalScore: totalScore.toFixed(2),
      recommendation: recommendation.text,
      passedParams,
      totalParams,
      scores: JSON.parse(JSON.stringify(scores)),
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const newHistory = [analysis, ...history].slice(0, 20);
    setHistory(newHistory);
    window.localStorage.setItem('stockAnalysisHistory', JSON.stringify(newHistory));
    alert('Analysis saved to history!');
  };

  const loadFromHistory = (savedAnalysis) => {
    setStockName(savedAnalysis.stockName);
    setScores(savedAnalysis.scores);
    setShowHistory(false);
    setActiveTab('calculator');
  };

  const deleteFromHistory = (id) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    window.localStorage.setItem('stockAnalysisHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setHistory([]);
      window.localStorage.removeItem('stockAnalysisHistory');
    }
  };

  const resetScores = () => {
    const initial = {};
    Object.keys(scoringConfig).forEach(category => {
      initial[category] = {};
      scoringConfig[category].parameters.forEach((param, idx) => {
        initial[category][idx] = false;
      });
    });
    setScores(initial);
    setStockName('');
  };

  const exportData = () => {
    if (!stockName.trim()) {
      alert('Please enter a stock name before exporting!');
      return;
    }

    const csvRows = [];
    csvRows.push(['Bharat Stock Screener - Analysis Report']);
    csvRows.push(['Stock Name', stockName]);
    csvRows.push(['Date', new Date().toLocaleString('en-IN')]);
    csvRows.push(['Total Score', totalScore.toFixed(2) + '/100']);
    csvRows.push(['Recommendation', recommendation.text]);
    csvRows.push(['Parameters Passed', `${passedParams}/${totalParams}`]);
    csvRows.push(['Pass Rate', ((passedParams/totalParams)*100).toFixed(1) + '%']);
    csvRows.push([]);
    csvRows.push(['Category Analysis']);
    csvRows.push(['Category', 'Score', 'Max Score', 'Percentage']);
    
    Object.entries(scoringConfig).forEach(([key, config]) => {
      const score = calculateCategoryScore(key);
      const percentage = ((score / config.weight) * 100).toFixed(1);
      csvRows.push([
        key.replace(/([A-Z])/g, ' $1').trim(),
        score.toFixed(2),
        config.weight,
        percentage + '%'
      ]);
    });

    csvRows.push([]);
    csvRows.push(['Parameter Details']);
    csvRows.push(['Category', 'Parameter', 'Status', 'Points', 'Critical']);

    Object.entries(scoringConfig).forEach(([key, config]) => {
      config.parameters.forEach((param, idx) => {
        csvRows.push([
          key.replace(/([A-Z])/g, ' $1').trim(),
          param.name,
          scores[key][idx] ? 'PASS' : 'FAIL',
          param.points,
          param.critical ? 'YES' : 'NO'
        ]);
      });
    });

    csvRows.push([]);
    csvRows.push(['Generated by', '@pankajkori']);
    csvRows.push(['Copyright', 'All rights reserved © 2025']);

    const csvContent = csvRows.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${stockName.replace(/[^a-z0-9]/gi, '_')}_analysis_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    if (!stockName.trim()) {
      alert('Please enter a stock name before exporting!');
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${stockName} - Stock Analysis Report</title>
        <style>
          @media print {
            @page { margin: 0.5in; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            padding: 30px; 
            background: white;
            color: #333;
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px; 
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
          }
          .header h1 { 
            font-size: 28px; 
            color: #1e40af; 
            margin-bottom: 10px;
          }
          .score-box { 
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); 
            color: white; 
            padding: 25px; 
            border-radius: 15px; 
            text-align: center; 
            margin-bottom: 25px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .score-box .score { 
            font-size: 60px; 
            font-weight: bold; 
          }
          .stats { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 15px; 
            margin-bottom: 25px;
          }
          .stat-card { 
            background: #f1f5f9; 
            padding: 15px; 
            border-radius: 8px;
            text-align: center;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .category { 
            margin-bottom: 20px; 
            page-break-inside: avoid;
          }
          .category-header { 
            background: #3b82f6; 
            color: white; 
            padding: 12px 15px; 
            border-radius: 8px 8px 0 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .parameter { 
            display: flex; 
            align-items: center; 
            padding: 10px; 
            margin-bottom: 6px; 
            background: white;
            border: 1px solid #e2e8f0;
          }
          .parameter .checkbox { 
            width: 18px; 
            height: 18px; 
            border: 2px solid #cbd5e1; 
            margin-right: 10px;
            display: inline-block;
            text-align: center;
            line-height: 14px;
            border-radius: 3px;
          }
          .parameter.passed .checkbox { 
            background: #10b981; 
            border-color: #10b981; 
            color: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .footer { 
            margin-top: 40px; 
            padding-top: 15px; 
            border-top: 2px solid #e2e8f0; 
            text-align: center; 
            color: #64748b;
            font-size: 12px;
          }
          .footer .credit { 
            font-weight: bold; 
            color: #2563eb; 
            margin-bottom: 5px;
          }
        </style>
      </head>
      <body>
        <div class="header">
        
          <h1>Bharat Stock Screener</h1>
          <div style="font-size: 18px; font-weight: bold; margin: 8px 0;">${stockName}</div>
          <div style="font-size: 12px; color: #64748b;">${new Date().toLocaleString('en-IN')}</div>
        </div>

        <div class="score-box">
          <div style="font-size: 16px; margin-bottom: 10px;">Overall Score</div>
          <div class="score">${totalScore.toFixed(0)}<span style="font-size: 30px;">/100</span></div>
          <div style="font-size: 28px; margin-top: 10px; font-weight: bold;">${recommendation.emoji} ${recommendation.text}</div>
        </div>

        <div class="stats">
          <div class="stat-card">
            <div style="font-size: 11px; color: #64748b; margin-bottom: 5px;">PARAMETERS PASSED</div>
            <div style="font-size: 24px; font-weight: bold;">${passedParams}/${totalParams}</div>
          </div>
          <div class="stat-card">
            <div style="font-size: 11px; color: #64748b; margin-bottom: 5px;">PASS RATE</div>
            <div style="font-size: 24px; font-weight: bold;">${((passedParams/totalParams)*100).toFixed(0)}%</div>
          </div>
          <div class="stat-card">
            <div style="font-size: 11px; color: #64748b; margin-bottom: 5px;">QUALITY RATING</div>
            <div style="font-size: 20px; font-weight: bold;">${recommendation.text}</div>
          </div>
        </div>

        <h2 style="margin: 25px 0 15px 0; color: #1e293b; font-size: 20px;">Category Breakdown</h2>

        ${Object.entries(scoringConfig).map(([key, config]) => {
          const categoryScore = calculateCategoryScore(key);
          return `
            <div class="category">
              <div class="category-header">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="text-transform: capitalize; font-weight: bold;">${key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span style="font-size: 18px; font-weight: bold;">${categoryScore.toFixed(1)} / ${config.weight}</span>
                </div>
              </div>
              <div style="background: #f8fafc; padding: 12px; border: 1px solid #e2e8f0; border-top: none;">
                ${config.parameters.map((param, idx) => `
                  <div class="parameter ${scores[key][idx] ? 'passed' : ''}">
                    <span class="checkbox">${scores[key][idx] ? '✓' : ''}</span>
                    <span style="flex: 1; font-size: 13px;">${param.name}</span>
                    ${param.critical ? '<span style="background: #ef4444; color: white; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: bold; margin-right: 8px;">CRITICAL</span>' : ''}
                    <span style="font-weight: bold; color: #64748b; font-size: 12px;">${param.points} pts</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}

        <div class="footer">
          <div class="credit">Created by @pankajkori</div>
          <div>All rights reserved © ${new Date().getFullYear()}</div>
          <div style="margin-top: 8px; font-style: italic;">
            Generated using 20-parameter weighted scoring system
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    } else {
      alert('Please allow pop-ups to export PDF');
    }
  };

  const shareResults = () => {
    const text = `${stockName ? stockName + ' ' : ''}Stock Analysis:\n\nScore: ${totalScore.toFixed(0)}/100\nRecommendation: ${recommendation.text}\nParameters: ${passedParams}/${totalParams}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    }
  };

  const loadSampleData = () => {
    if (window.confirm('Load sample data for Infosys? This will replace current data.')) {
      setStockName('Infosys Ltd');
      const sampleScores = {
        basic: { 0: true, 1: true },
        profitability: { 0: true, 1: true, 2: true, 3: true, 4: true },
        financialHealth: { 0: true, 1: true, 2: true, 3: true },
        valuation: { 0: true, 1: false, 2: true, 3: true },
        growth: { 0: true, 1: true, 2: true },
        cashFlow: { 0: true, 1: true, 2: true }
      };
      setScores(sampleScores);
      setActiveTab('calculator');
      setShowHistory(false);
    }
  };

  const bgClass = isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-slate-100';
  const cardBg = isDark ? 'bg-slate-800' : 'bg-white';
  const textPrimary = isDark ? 'text-slate-100' : 'text-slate-800';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-600';
  const borderColor = isDark ? 'border-slate-700' : 'border-slate-200';
  
  //  -------------------- //
  return (
    <>

       <SEO 
        title="Free Stock Screener for Indian Markets"
        description="Analyze NSE & BSE stocks using our advanced 20-parameter weighted scoring system. Find potential multibagger stocks with comprehensive fundamental analysis. Free stock screening tool for Indian investors."
        keywords="stock screener India, NSE stocks, BSE stocks, multibagger stocks, stock analysis, fundamental analysis, Indian stock market, free stock screener, stock calculator, investment tool"
        url="/"
      />

    <div className={`min-h-screen ${bgClass} transition-colors duration-300 p-3 sm:p-6`}>
      <div className="max-w-7xl mx-auto">
        <div className={`${cardBg} rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* <Award className={`w-6 sm:w-8 h-6 sm:h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} /> */}
              <img src={StockImg} alt=""  className={`w-18 sm:w-18 h-20 sm:h-20 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <h1 className={`text-xl sm:text-3xl font-bold ${textPrimary}`}>Bharat Stock Screener</h1>
                <p className={`text-xs sm:text-sm ${textSecondary}`}>Explore Potential Multibagger Stocks</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              {/* Theme toggle removed, now only in Header */}

              <button onClick={loadSampleData} className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`} title="Load Sample Data">
                <Upload className={`w-4 sm:w-5 h-4 sm:h-5 ${textPrimary}`} />
              </button>
              
              <button onClick={saveToHistory} className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`} title="Save">
                <Download className={`w-4 sm:w-5 h-4 sm:h-5 ${textPrimary}`} />
              </button>

              <button onClick={() => setShowHistory(!showHistory)} className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'} relative`} title="History">
                <History className={`w-4 sm:w-5 h-4 sm:h-5 ${textPrimary}`} />
                {history.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {history.length}
                  </span>
                )}
              </button>

              <button onClick={exportToPDF} className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`} title="Export PDF">
                <FileText className={`w-4 sm:w-5 h-4 sm:h-5 ${textPrimary}`} />
              </button>
              
              <button onClick={exportData} className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`} title="Export CSV">
                <Download className={`w-4 sm:w-5 h-4 sm:h-5 ${textPrimary}`} />
              </button>
              
              <button onClick={resetScores} className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`} title="Reset">
                <RefreshCw className={`w-4 sm:w-5 h-4 sm:h-5 ${textPrimary}`} />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <input
              type="text"
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
              placeholder="Enter stock name (e.g., Divi's Laboratories)"
              className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${isDark ? 'bg-slate-700 text-slate-100' : 'bg-white'} focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
            />
          </div>
        </div>

        {showHistory && (
          <div className={`${cardBg} rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg sm:text-xl font-bold ${textPrimary}`}>
                Analysis History ({history.length})
              </h2>
              <button
                onClick={clearHistory}
                className={`text-sm px-3 py-1.5 rounded-lg ${isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'}`}
              >
                Clear All
              </button>
            </div>

            {history.length === 0 ? (
              <div className={`text-center py-8 ${textSecondary}`}>
                <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No saved analyses yet</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {history.map((item) => (
                  <div key={item.id} className={`p-4 rounded-lg border-2 ${borderColor}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className={`font-bold ${textPrimary} truncate`}>{item.stockName}</h3>
                        <p className={`text-xs ${textSecondary}`}>{item.date}</p>
                      </div>
                      <button onClick={() => deleteFromHistory(item.id)} className="p-1.5 rounded">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-2xl font-bold ${textPrimary}`}>{item.totalScore}</span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          parseFloat(item.totalScore) >= 70 ? 'bg-green-500' : 'bg-yellow-500'
                        } text-white`}>
                          {item.recommendation}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => loadFromHistory(item)}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm"
                    >
                      Load Analysis
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className={`${cardBg} rounded-xl shadow-md p-3 sm:p-4`}>
            <div className={`text-xs sm:text-sm ${textSecondary} mb-1`}>Total Score</div>
            <div className={`text-2xl sm:text-3xl font-bold ${textPrimary}`}>{totalScore.toFixed(0)}</div>
          </div>
          <div className={`${cardBg} rounded-xl shadow-md p-3 sm:p-4`}>
            <div className={`text-xs sm:text-sm ${textSecondary} mb-1`}>Passed</div>
            <div className={`text-2xl sm:text-3xl font-bold ${textPrimary}`}>{passedParams}/{totalParams}</div>
          </div>
          <div className={`${cardBg} rounded-xl shadow-md p-3 sm:p-4`}>
            <div className={`text-xs sm:text-sm ${textSecondary} mb-1`}>Pass Rate</div>
            <div className={`text-2xl sm:text-3xl font-bold ${textPrimary}`}>{((passedParams/totalParams)*100).toFixed(0)}%</div>
          </div>
          <div className={`${cardBg} rounded-xl shadow-md p-3 sm:p-4`}>
            <div className={`text-xs sm:text-sm ${textSecondary} mb-1`}>Rating</div>
            <div className={`text-lg sm:text-xl font-bold ${recommendation.color}`}>{recommendation.emoji}</div>
          </div>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap text-sm ${
              activeTab === 'calculator' ? 'bg-blue-600 text-white' : `${cardBg} ${textSecondary}`
            }`}
          >
            Calculator
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap text-sm ${
              activeTab === 'methodology' ? 'bg-blue-600 text-white' : `${cardBg} ${textSecondary}`
            }`}
          >
            Methodology
          </button>
          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap text-sm ${
              activeTab === 'benchmarks' ? 'bg-blue-600 text-white' : `${cardBg} ${textSecondary}`
            }`}
          >
            Benchmarks
          </button>
        </div>

        {activeTab === 'calculator' && (
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              {Object.entries(scoringConfig).map(([key, config]) => {
                const Icon = config.icon;
                const categoryScore = calculateCategoryScore(key);
                const percentage = (categoryScore / config.weight) * 100;

                return (
                  <div key={key} className={`${cardBg} rounded-xl shadow-md overflow-hidden`}>
                    <div className={`bg-gradient-to-r ${isDark ? config.darkColor : config.color} p-3 text-white`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5" />
                          <h3 className="font-bold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                        </div>
                        <div className="text-xl font-bold">{categoryScore.toFixed(1)}/{config.weight}</div>
                      </div>
                    </div>

                    <div className={`${isDark ? 'bg-slate-700' : 'bg-slate-100'} h-2`}>
                      <div className={`h-full bg-gradient-to-r ${isDark ? config.darkColor : config.color}`} style={{ width: `${percentage}%` }} />
                    </div>

                    <div className="p-3 space-y-2">
                      {config.parameters.map((param, idx) => (
                        <label key={idx} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-50'}`}>
                          <input
                            type="checkbox"
                            checked={scores[key][idx] || false}
                            onChange={() => toggleScore(key, idx)}
                            className="w-4 h-4 rounded"
                          />
                          <span className={`flex-1 text-sm ${textPrimary}`}>{param.name}</span>
                          {param.critical && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">KEY</span>}
                          <span className={`text-sm font-semibold ${textSecondary}`}>{param.points}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`${cardBg} rounded-xl shadow-lg p-4 lg:sticky lg:top-6 h-fit`}>
              <h3 className={`text-lg font-bold ${textPrimary} mb-4`}>Overall Score</h3>
              
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke={isDark ? '#374151' : '#e5e7eb'} strokeWidth="12" fill="none" />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke={totalScore >= 70 ? '#10b981' : totalScore >= 55 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(totalScore / 100) * 440} 440`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className={`text-4xl font-bold ${textPrimary}`}>{totalScore.toFixed(0)}</div>
                  <div className={`text-xs ${textSecondary}`}>/100</div>
                </div>
              </div>

              <div className={`${recommendation.bg} rounded-lg p-3 mb-4 text-center`}>
                <div className="text-2xl mb-1">{recommendation.emoji}</div>
                <div className={`text-xl font-bold ${recommendation.color}`}>{recommendation.text}</div>
                <div className={`text-xs ${textSecondary} mt-1`}>{recommendation.desc}</div>
              </div>

              <div className="space-y-2">
                <h4 className={`font-semibold ${textPrimary} text-sm`}>Category Breakdown</h4>
                {Object.entries(scoringConfig).map(([key, config]) => {
                  const score = calculateCategoryScore(key);
                  const percentage = (score / config.weight) * 100;
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={`${textSecondary} capitalize`}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className={`font-semibold ${textPrimary}`}>{score.toFixed(1)}/{config.weight}</span>
                      </div>
                      <div className={`h-2 ${isDark ? 'bg-slate-700' : 'bg-slate-200'} rounded-full overflow-hidden`}>
                        <div className={`h-full bg-gradient-to-r ${isDark ? config.darkColor : config.color}`} style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'methodology' && (
          <div className={`${cardBg} rounded-xl shadow-lg p-4 sm:p-8`}>
            <h2 className={`text-xl sm:text-2xl font-bold ${textPrimary} mb-4`}>Scoring Methodology</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className={`text-lg font-bold ${textPrimary} mb-3`}>Why Weighted Scoring?</h3>
                <div className={`space-y-2 ${textSecondary} text-sm`}>
                  <p>✓ Not all parameters are equally important</p>
                  <p>✓ Profitability and financial health matter most</p>
                  <p>✓ Provides nuanced evaluation vs binary pass/fail</p>
                </div>
              </div>

              <div className={`border-t ${borderColor} pt-4`}>
                <h3 className={`text-lg font-bold ${textPrimary} mb-3`}>Weight Distribution</h3>
                {Object.entries(scoringConfig).map(([key, config]) => (
                  <div key={key} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className={`font-semibold ${textPrimary} capitalize text-sm`}>
                        {key.replace(/([A-Z])/g, ' $1').trim()} ({config.weight}%)
                      </span>
                    </div>
                    <div className={`h-2 ${isDark ? 'bg-slate-700' : 'bg-slate-200'} rounded-full`}>
                      <div className={`h-full bg-gradient-to-r ${isDark ? config.darkColor : config.color}`} style={{ width: `${config.weight}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benchmarks' && (
          <div className={`${cardBg} rounded-xl shadow-lg p-4 sm:p-8`}>
            <h2 className={`text-xl font-bold ${textPrimary} mb-4`}>Industry Benchmarks</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className={`${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <th className={`p-2 text-left ${textPrimary}`}>Sector</th>
                    <th className={`p-2 text-left ${textPrimary}`}>Avg ROE</th>
                    <th className={`p-2 text-left ${textPrimary}`}>Avg P/E</th>
                    <th className={`p-2 text-left ${textPrimary}`}>Expected Score</th>
                  </tr>
                </thead>
                <tbody className={textSecondary}>
                  <tr className={`border-t ${borderColor}`}>
                    <td className="p-2 font-semibold">FMCG</td>
                    <td className="p-2">25-35%</td>
                    <td className="p-2">40-60</td>
                    <td className="p-2"><span className="text-green-500 font-bold">75-85</span></td>
                  </tr>
                  <tr className={`border-t ${borderColor}`}>
                    <td className="p-2 font-semibold">IT Services</td>
                    <td className="p-2">20-30%</td>
                    <td className="p-2">20-30</td>
                    <td className="p-2"><span className="text-green-500 font-bold">70-80</span></td>
                  </tr>
                  <tr className={`border-t ${borderColor}`}>
                    <td className="p-2 font-semibold">Pharma</td>
                    <td className="p-2">15-25%</td>
                    <td className="p-2">25-50</td>
                    <td className="p-2"><span className="text-green-500 font-bold">65-75</span></td>
                  </tr>
                  <tr className={`border-t ${borderColor}`}>
                    <td className="p-2 font-semibold">Auto</td>
                    <td className="p-2">10-20%</td>
                    <td className="p-2">15-30</td>
                    <td className="p-2"><span className="text-yellow-500 font-bold">55-65</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={`mt-6 p-4 ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-lg`}>
              <div className="flex items-start gap-2">
                <AlertCircle className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <div className="text-xs">
                  <p className={`font-semibold ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>Note:</p>
                  <p className={textSecondary}>Scores vary by market conditions and business cycles</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`max-w-7xl mx-auto mt-8 pb-4 text-center ${textSecondary} text-xs border-t ${borderColor} pt-4`}>
        {/* <img src={StockImg} className='max-w-20' alt="" /> */}
        <div className="font-bold text-blue-600 mb-1">Created by @pankajkori</div>
        <div>All rights reserved © {new Date().getFullYear()}</div>
      </div>
    </div>

    </>
  );
};

export default HomePage;




