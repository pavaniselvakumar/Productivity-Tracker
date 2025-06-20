import React, { useState } from "react";

const WorkLifeBalance = () => {
  const [activeTopic, setActiveTopic] = useState(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState(null);
  const [answers, setAnswers] = useState({
    studyHours: null,
    sleepHours: null, 
    exerciseFrequency: null,
    socialTime: null,
    stressLevel: null
  });

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
    setShowAssessment(false);
  };

  const handleAssessmentClick = () => {
    setActiveTopic(null);
    setShowAssessment(true);
  };

  const handleAnswerChange = (question, value) => {
    setAnswers(prev => ({
      ...prev,
      [question]: value
    }));
  };

  const calculateScore = () => {
    // Simple scoring algorithm
    let score = 0;
    
    // Study hours (balance is key: 3-6 hours is optimal)
    if (answers.studyHours === "1-2") score += 1;
    else if (answers.studyHours === "3-6") score += 3;
    else if (answers.studyHours === "7+") score += 1;
    
    // Sleep hours
    if (answers.sleepHours === "Less than 6") score += 0;
    else if (answers.sleepHours === "6-8") score += 2;
    else if (answers.sleepHours === "More than 8") score += 3;
    
    // Exercise frequency
    if (answers.exerciseFrequency === "Rarely") score += 0;
    else if (answers.exerciseFrequency === "1-2 times") score += 1;
    else if (answers.exerciseFrequency === "3+ times") score += 2;
    
    // Social time
    if (answers.socialTime === "Almost none") score += 0;
    else if (answers.socialTime === "Few hours") score += 2;
    else if (answers.socialTime === "Regular time") score += 3;
    
    // Stress level
    if (answers.stressLevel === "High") score += 0;
    else if (answers.stressLevel === "Moderate") score += 1;
    else if (answers.stressLevel === "Low") score += 3;
    
    return score;
  };

  const submitAssessment = () => {
    const score = calculateScore();
    setAssessmentScore(score);
  };

  const getRecommendation = () => {
    if (assessmentScore <= 5) {
      return {
        status: "Needs Improvement",
        color: "#ff6b6b",
        message: "Your work-life balance needs attention. Consider implementing our time management strategies and making more time for rest and social activities."
      };
    } else if (assessmentScore <= 9) {
      return {
        status: "Moderate Balance",
        color: "#ffd166",
        message: "You're doing okay, but there's room for improvement. Try incorporating more structured study sessions and self-care activities."
      };
    } else {
      return {
        status: "Good Balance",
        color: "#06d6a0",
        message: "Great job maintaining balance! Keep up with your current habits and look for ways to optimize your productivity further."
      };
    }
  };

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: "50px",
      background: "#111",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
    },
    title: {
      fontSize: "3rem",
      marginBottom: "10px",
      textShadow: "0 4px 10px rgba(0, 255, 255, 0.3)",
      letterSpacing: "3px",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#00ffcc",
      textTransform: "uppercase",
    },
    cardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "30px",
      width: "100%",
      maxWidth: "1200px",
      margin: "20px 0",
    },
    card: {
      padding: "20px",
      background: "#1c1c1c",
      borderRadius: "20px",
      border: "2px solid transparent",
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.4s ease",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
      color: "#fff",
      cursor: "pointer",
    },
    cardTitle: {
      fontSize: "1.4rem",
      textAlign: "center",
      fontWeight: "600",
      color: "#00ffcc",
      textTransform: "uppercase",
    },
    content: {
      fontSize: "1rem",
      color: "#ddd",
      lineHeight: "1.4",
      marginTop: "20px",
      textAlign: "left",
      maxWidth: "800px",
      width: "100%",
    },
    button: {
      background: "#00ffcc",
      color: "#111",
      border: "none",
      padding: "12px 24px",
      borderRadius: "30px",
      fontSize: "1rem",
      fontWeight: "600",
      marginTop: "20px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    assessmentContainer: {
      background: "#1c1c1c",
      padding: "30px",
      borderRadius: "20px",
      maxWidth: "800px",
      width: "100%",
    },
    question: {
      marginBottom: "20px",
    },
    options: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginTop: "10px",
    },
    option: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    resultContainer: {
      textAlign: "center",
      marginTop: "30px",
    },
    tipsSection: {
      marginTop: "30px",
    },
    tipCard: {
      background: "#2a2a2a",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "15px",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>WORK LIFE BALANCE</h1>
        <p style={styles.subtitle}>
          Harmonize your professional journey with personal growth and well-being
        </p>
      </div>
      <div style={styles.cardsContainer}>
        <div
          style={styles.card}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 255, 255, 0.4)";
            e.currentTarget.style.border = "2px solid #00ffcc";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.4)";
            e.currentTarget.style.border = "2px solid transparent";
          }}
          onClick={() => handleTopicClick("Deep Focus Strategies")}
        >
          <h3 style={styles.cardTitle}>Deep Focus Strategies</h3>
        </div>
        <div
          style={styles.card}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 255, 255, 0.4)";
            e.currentTarget.style.border = "2px solid #00ffcc";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.4)";
            e.currentTarget.style.border = "2px solid transparent";
          }}
          onClick={() => handleTopicClick("Mindful Breaks")}
        >
          <h3 style={styles.cardTitle}>Mindful Breaks</h3>
        </div>
        <div
          style={styles.card}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 255, 255, 0.4)";
            e.currentTarget.style.border = "2px solid #00ffcc";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.4)";
            e.currentTarget.style.border = "2px solid transparent";
          }}
          onClick={() => handleTopicClick("Energy Management")}
        >
          <h3 style={styles.cardTitle}>Energy Management</h3>
        </div>
        <div
          style={styles.card}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 255, 255, 0.4)";
            e.currentTarget.style.border = "2px solid #00ffcc";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.4)";
            e.currentTarget.style.border = "2px solid transparent";
          }}
          onClick={handleAssessmentClick}
        >
          <h3 style={styles.cardTitle}>Balance Assessment</h3>
        </div>
      </div>
      
      {activeTopic && (
        <div style={styles.content}>
          {activeTopic === "Deep Focus Strategies" && (
            <>
              <h2 style={{ color: "#00ffcc" }}>Deep Focus Strategies</h2>
              <p>Optimize your study sessions with science-backed focus techniques:</p>
              
              <div style={styles.tipCard}>
                <h3>🔄 The Pomodoro Technique 2.0</h3>
                <p>Enhanced time management with adjustable intervals based on your energy levels:</p>
                <ul>
                  <li>High energy: 35 minutes focus / 7 minutes break</li>  
                  <li>Normal energy: 25 minutes focus / 5 minutes break</li>
                  <li>Low energy: 15 minutes focus / 5 minutes break</li>
                </ul>
              </div>
              
              <div style={styles.tipCard}>
                <h3>🏞️ Environment Design</h3>
                <p>Create different study zones based on the type of work:</p>
                <ul>
                  <li><strong>Deep work zone:</strong> Completely distraction-free for complex problems</li>
                  <li><strong>Light work zone:</strong> Comfortable area for readings and reviews</li>
                  <li><strong>Collaboration zone:</strong> Where you can work with peers</li>
                </ul>
              </div>
              
              <div style={styles.tipCard}>
                <h3>🧠 Cognitive Enhancement</h3>
                <p>Optimize your brain for learning:</p>
                <ul>
                  <li>Use active recall instead of passive re-reading</li>
                  <li>Implement spaced repetition for long-term retention</li>
                  <li>Try interleaving: switching between related subjects</li>
                  <li>Practice "teaching" concepts to solidify understanding</li>
                </ul>
              </div>
            </>
          )}
          
          {activeTopic === "Mindful Breaks" && (
            <>
              <h2 style={{ color: "#00ffcc" }}>Mindful Breaks</h2>
              <p>Strategic pauses that refresh your mind and enhance creativity:</p>
              
              <div style={styles.tipCard}>
                <h3>⏱️ Micro-Breaks (5 minutes)</h3>
                <ul>
                  <li><strong>4-7-8 Breathing:</strong> Inhale for 4 seconds, hold for 7, exhale for 8</li>
                  <li><strong>Visual Reset:</strong> Focus on distant objects to reduce eye strain</li>
                  <li><strong>Stretch Sequence:</strong> Quick desk stretches for neck, shoulders, and wrists</li>
                </ul>
              </div>
              
              <div style={styles.tipCard}>
                <h3>🌿 Refresh Breaks (15-30 minutes)</h3>
                <ul>
                  <li><strong>Nature Immersion:</strong> Brief outdoor walks to boost creative thinking</li>
                  <li><strong>Mindfulness Meditation:</strong> Guided sessions using apps like Headspace or Calm</li>
                  <li><strong>Power Nap:</strong> 10-20 minute naps for cognitive refreshment</li>
                  <li><strong>Creative Expression:</strong> Quick sketching, journaling, or playing an instrument</li>
                </ul>
              </div>
              
              <div style={styles.tipCard}>
                <h3>🔄 Context Switching</h3>
                <p>Strategic activity rotation to maximize mental freshness:</p>
                <ul>
                  <li>Alternate analytical tasks with creative ones</li>
                  <li>Switch between reading, writing, and problem-solving</li>
                  <li>Move between individual focus and group collaboration</li>
                </ul>
              </div>
            </>
          )}
          
          {activeTopic === "Energy Management" && (
            <>
              <h2 style={{ color: "#00ffcc" }}>Energy Management</h2>
              <p>Optimize your physical and mental resources throughout the day:</p>
              
              <div style={styles.tipCard}>
                <h3>⚡ Personal Energy Mapping</h3>
                <p>Track your energy patterns to schedule activities strategically:</p>
                <ul>
                  <li>Identify your peak cognitive hours for complex tasks</li>
                  <li>Schedule creative work during moderate energy periods</li>
                  <li>Use low energy times for administrative or routine tasks</li>
                  <li>Create a visual energy map for your typical week</li>
                </ul>
              </div>
              
              <div style={styles.tipCard}>
                <h3>🥗 Nutritional Strategy</h3>
                <p>Fuel your brain with the right nutrients at the right time:</p>
                <ul>
                  <li><strong>Pre-study fuel:</strong> Complex carbs + protein (oatmeal with nuts)</li>
                  <li><strong>During study:</strong> Hydration + slow-release energy (water, herbal tea)</li>
                  <li><strong>Energy dips:</strong> Natural glucose sources (fruit, dark chocolate)</li>
                  <li>Avoid sugar crashes from processed foods and energy drinks</li>
                </ul>
              </div>
              
              <div style={styles.tipCard}>
                <h3>😴 Sleep Optimization</h3>
                <p>Quality sleep is your cognitive superpower:</p>
                <ul>
                  <li>Consistent sleep-wake schedule (even on weekends)</li>
                  <li>30-minute digital sunset before bed (blue light filters)</li>
                  <li>Power down with a bedtime ritual (reading, journaling)</li>
                  <li>Track sleep quality with apps to identify improvement areas</li>
                </ul>
              </div>
            </>
          )}
        </div>
      )}
      
      {showAssessment && (
        <div style={styles.content}>
          <h2 style={{ color: "#00ffcc" }}>Balance Assessment Tool</h2>
          
          {!assessmentScore ? (
            <div style={styles.assessmentContainer}>
              <p>Answer these questions to receive personalized balance recommendations:</p>
              
              <div style={styles.question}>
                <h3>1. How many hours do you typically study each day?</h3>
                <div style={styles.options}>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="studyHours" 
                      value="1-2" 
                      onChange={() => handleAnswerChange("studyHours", "1-2")} 
                    />
                    1-2 hours
                  </label>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="studyHours" 
                      value="3-6" 
                      onChange={() => handleAnswerChange("studyHours", "3-6")} 
                    />
                    3-6 hours
                  </label>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="studyHours" 
                      value="7+" 
                      onChange={() => handleAnswerChange("studyHours", "7+")} 
                    />
                    7+ hours
                  </label>
                </div>
              </div>
              
              <div style={styles.question}>
                <h3>2. How many hours of sleep do you get per night?</h3>
                <div style={styles.options}>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="sleepHours" 
                      value="Less than 6" 
                      onChange={() => handleAnswerChange("sleepHours", "Less than 6")} 
                    />
                    Less than 6 hours
                  </label>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="sleepHours" 
                      value="6-8" 
                      onChange={() => handleAnswerChange("sleepHours", "6-8")} 
                    />
                    6-8 hours
                  </label>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="sleepHours" 
                      value="More than 8" 
                      onChange={() => handleAnswerChange("sleepHours", "More than 8")} 
                    />
                    More than 8 hours
                  </label>
                </div>
              </div>
              
              <div style={styles.question}>
                <h3>3. How often do you exercise per week?</h3>
                <div style={styles.options}>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="exerciseFrequency" 
                      value="Rarely" 
                      onChange={() => handleAnswerChange("exerciseFrequency", "Rarely")} 
                    />
                    Rarely or never
                  </label>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="exerciseFrequency" 
                      value="1-2 times" 
                      onChange={() => handleAnswerChange("exerciseFrequency", "1-2 times")} 
                    />
                    1-2 times per week
                  </label>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="exerciseFrequency" 
                      value="3+ times" 
                      onChange={() => handleAnswerChange("exerciseFrequency", "3+ times")} 
                    />
                    3+ times per week
                  </label>
                </div>
              </div>
              
              <div style={styles.question}>
                <h3>4. How much time do you spend socializing per week?</h3>
                <div style={styles.options}>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="socialTime" 
                      value="Almost none" 
                      onChange={() => handleAnswerChange("socialTime", "Almost none")} 
                    />
                    Almost none
                  </label>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="socialTime" 
                      value="Few hours" 
                      onChange={() => handleAnswerChange("socialTime", "Few hours")} 
                    />
                    A few hours
                  </label>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="socialTime" 
                      value="Regular time" 
                      onChange={() => handleAnswerChange("socialTime", "Regular time")} 
                    />
                    Regular dedicated time
                  </label>
                </div>
              </div>
              
              <div style={styles.question}>
                <h3>5. What's your current stress level?</h3>
                <div style={styles.options}>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="stressLevel" 
                      value="High" 
                      onChange={() => handleAnswerChange("stressLevel", "High")} 
                    />
                    High (feeling overwhelmed)
                  </label>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="stressLevel" 
                      value="Moderate" 
                      onChange={() => handleAnswerChange("stressLevel", "Moderate")} 
                    />
                    Moderate (manageable stress)
                  </label>
                  <label style={styles.option}>
                    <input 
                      type="radio" 
                      name="stressLevel" 
                      value="Low" 
                      onChange={() => handleAnswerChange("stressLevel", "Low")} 
                    />
                    Low (feeling balanced)
                  </label>
                </div>
              </div>
              
              <button 
                style={styles.button}
                onClick={submitAssessment}
                disabled={
                  !answers.studyHours || 
                  !answers.sleepHours || 
                  !answers.exerciseFrequency || 
                  !answers.socialTime || 
                  !answers.stressLevel
                }
              >
                Get Your Balance Score
              </button>
            </div>
          ) : (
            <div style={styles.assessmentContainer}>
              <div style={styles.resultContainer}>
                <h2>Your Balance Score: {assessmentScore}/13</h2>
                <div style={{
                  background: getRecommendation().color,
                  padding: "10px 20px",
                  borderRadius: "30px",
                  display: "inline-block",
                  marginTop: "10px",
                  color: "#111",
                  fontWeight: "bold"
                }}>
                  {getRecommendation().status}
                </div>
                <p style={{ marginTop: "20px" }}>{getRecommendation().message}</p>
                
                <div style={styles.tipsSection}>
                  <h3>Personalized Recommendations</h3>
                  
                  {answers.studyHours === "7+" && (
                    <div style={styles.tipCard}>
                      <h4>Study Balance</h4>
                      <p>You're studying many hours. Try to improve study efficiency rather than duration:</p>
                      <ul>
                        <li>Implement the Pomodoro technique</li>
                        <li>Focus on active recall rather than passive review</li>
                        <li>Take regular breaks to maintain cognitive performance</li>
                      </ul>
                    </div>
                  )}
                  
                  {answers.sleepHours === "Less than 6" && (
                    <div style={styles.tipCard}>
                      <h4>Sleep Improvement</h4>
                      <p>Your sleep duration needs attention:</p>
                      <ul>
                        <li>Create a consistent sleep schedule</li>
                        <li>Aim for 7-9 hours per night</li>
                        <li>Implement a digital sunset 30 minutes before bed</li>
                        <li>Create a calming pre-sleep routine</li>
                      </ul>
                    </div>
                  )}
                  
                  {answers.exerciseFrequency === "Rarely" && (
                    <div style={styles.tipCard}>
                      <h4>Physical Activity</h4>
                      <p>Adding movement to your routine will boost energy and focus:</p>
                      <ul>
                        <li>Start with short 10-minute walking breaks</li>
                        <li>Try desk exercises between study sessions</li>
                        <li>Consider activities you enjoy (dancing, sports, yoga)</li>
                        <li>Use exercise as a study break reward</li>
                      </ul>
                    </div>
                  )}
                  
                  {answers.socialTime === "Almost none" && (
                    <div style={styles.tipCard}>
                      <h4>Social Connection</h4>
                      <p>Building social time improves overall wellbeing:</p>
                      <ul>
                        <li>Schedule brief video calls with friends/family</li>
                        <li>Join study groups to combine socializing with academics</li>
                        <li>Participate in one social activity per week</li>
                        <li>Consider volunteer opportunities related to your field</li>
                      </ul>
                    </div>
                  )}
                  
                  {answers.stressLevel === "High" && (
                    <div style={styles.tipCard}>
                      <h4>Stress Management</h4>
                      <p>Implementing stress-reduction techniques is essential:</p>
                      <ul>
                        <li>Practice daily mindfulness meditation (5-10 minutes)</li>
                        <li>Use breathing techniques during high-stress moments</li>
                        <li>Break large projects into smaller, manageable tasks</li>
                        <li>Consider talking to a counselor or therapist</li>
                      </ul>
                    </div>
                  )}
                </div>
                
                <button 
                  style={styles.button}
                  onClick={() => {
                    setAssessmentScore(null);
                    setAnswers({
                      studyHours: null,
                      sleepHours: null, 
                      exerciseFrequency: null,
                      socialTime: null,
                      stressLevel: null
                    });
                  }}
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkLifeBalance;