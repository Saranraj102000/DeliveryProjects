import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Layout, Globe, Github, Menu, X, Rocket, Clock, Zap, Award, ThumbsUp, PieChart, Target, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('delivery');
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Create refs for each section
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const teamInsightsRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigate to Projects page and scroll to top
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Smooth scroll function
  const scrollToSection = (elementRef) => {
    if (elementRef && elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: 'smooth'
      });
      // Close mobile menu if open
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  };

  const projectStats = [
    { label: 'Completed Projects', value: '35+' },
    { label: 'Team Members', value: '12' },
    { label: 'Years Experience', value: '8' },
    { label: 'Client Satisfaction', value: '98%' }
  ];

  const featuredProjects = [
    { 
      id: 1, 
      title: 'E-Commerce Platform',
      description: 'A fully responsive online store with integrated payment systems',
      type: 'Web Development'
    },
    { 
      id: 2, 
      title: 'Healthcare Management System',
      description: 'Comprehensive solution for medical facilities',
      type: 'Full Stack'
    },
    { 
      id: 3, 
      title: 'Real Estate Marketplace',
      description: 'Property listing and management platform',
      type: 'Web Application'
    }
  ];

  return (
    <div className="landing-container">
      {/* Animated Background Orbs */}
      <div className="animated-background">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
        <div className="gradient-overlay"></div>
      </div>
      
      {/* Mouse Follow Effect */}
      <div 
        className="mouse-follow-circle" 
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px` 
        }}
      ></div>

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="logo-container">
            <Layout className="logo-icon" />
            <span className="logo-text">TeamShowcase</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Home</a>
            <a href="#projects" className="nav-link" onClick={(e) => {e.preventDefault(); scrollToSection(projectsRef)}}>Projects</a>
            <a href="#contact" className="nav-link" onClick={(e) => {e.preventDefault(); scrollToSection(contactRef)}}>Contact</a>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="mobile-menu-button" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-links">
              <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Home</a>
              <a href="#projects" className="nav-link" onClick={(e) => {e.preventDefault(); scrollToSection(projectsRef)}}>Projects</a>
              <a href="#contact" className="nav-link" onClick={(e) => {e.preventDefault(); scrollToSection(contactRef)}}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="hero-section" ref={heroRef}>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title animated-text">
              <span className="gradient-text">
                Showcasing Excellence
              </span>
              <br />
              in Every Project
            </h1>
            <p className="hero-description fade-in-up">
              Explore our portfolio of innovative solutions and successful projects
              delivered by our talented team of developers and designers.
            </p>
            <div className="hero-buttons fade-in-up">
              <button className="primary-button view-projects-btn" onClick={() => scrollToSection(projectsRef)}>
                View Projects <ArrowRight className="btn-icon" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Team Insights Section */}
      <section className="team-insights-section" id="team-insights" ref={teamInsightsRef}>
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Our Specialized Teams</h2>
            <p className="section-description">
              Learn about our dedicated delivery and customer experience teams that ensure project success and client satisfaction.
            </p>
          </div>
          
          {/* Team Tabs */}
          <div className="team-tabs">
            <div className="tabs-container">
              <button 
                onClick={() => handleTabChange('delivery')}
                className={`tab-button ${activeTab === 'delivery' ? 'active-tab' : ''}`}
              >
                Delivery Team
              </button>
              <button 
                onClick={() => handleTabChange('cx')}
                className={`tab-button ${activeTab === 'cx' ? 'active-tab' : ''}`}
              >
                CX Team
              </button>
            </div>
          </div>
          
          {/* Delivery Team Content */}
          <div className={`team-content ${activeTab === 'delivery' ? 'show' : 'hide'}`}>
            <div className="team-card">
              <div className="team-overview">
                <div className="team-icon-container">
                  <div className="team-icon delivery-icon">
                    <Rocket size={64} className="icon-white" />
                  </div>
                </div>
                <div className="team-details">
                  <h3 className="team-name">Project Delivery Excellence</h3>
                  <p className="team-description">
                    Our delivery team consists of specialized professionals who follow a rigorous methodology to ensure timely and quality project completion. With expertise in agile methodologies and DevOps practices, we consistently deliver projects that exceed client expectations.
                  </p>
                  <div className="team-tags">
                    <span className="tag delivery-tag">Agile Methodology</span>
                    <span className="tag delivery-tag">DevOps</span>
                    <span className="tag delivery-tag">CI/CD</span>
                    <span className="tag delivery-tag">Quality Assurance</span>
                  </div>
                </div>
              </div>
              
              <div className="features-grid">
                <div className="feature-card">
                  <Clock className="feature-icon delivery-feature-icon" />
                  <h4 className="feature-title">Timely Delivery</h4>
                  <p className="feature-description">95% of our projects are delivered on or ahead of schedule due to our efficient project management processes.</p>
                </div>
                <div className="feature-card">
                  <Zap className="feature-icon delivery-feature-icon" />
                  <h4 className="feature-title">Rapid Implementation</h4>
                  <p className="feature-description">We specialize in quick deployment while maintaining high quality standards and thorough testing protocols.</p>
                </div>
                <div className="feature-card">
                  <Award className="feature-icon delivery-feature-icon" />
                  <h4 className="feature-title">Quality Assurance</h4>
                  <p className="feature-description">Every project undergoes rigorous QA testing with a comprehensive checklist of over 100 quality parameters.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CX Team Content */}
          <div className={`team-content ${activeTab === 'cx' ? 'show' : 'hide'}`}>
            <div className="team-card">
              <div className="team-overview">
                <div className="team-icon-container">
                  <div className="team-icon cx-icon">
                    <Headphones size={64} className="icon-white" />
                  </div>
                </div>
                <div className="team-details">
                  <h3 className="team-name">Customer Experience Specialists</h3>
                  <p className="team-description">
                    Our CX team is dedicated to ensuring exceptional client satisfaction through continuous engagement, responsive support, and relationship management. We prioritize understanding client needs and delivering solutions that address their specific challenges.
                  </p>
                  <div className="team-tags">
                    <span className="tag cx-tag">Client Support</span>
                    <span className="tag cx-tag">Relationship Management</span>
                    <span className="tag cx-tag">User Testing</span>
                    <span className="tag cx-tag">Training</span>
                  </div>
                </div>
              </div>
              
              <div className="features-grid">
                <div className="feature-card">
                  <ThumbsUp className="feature-icon cx-feature-icon" />
                  <h4 className="feature-title">Client Satisfaction</h4>
                  <p className="feature-description">98% client satisfaction rate with proactive support and personalized service throughout the project lifecycle.</p>
                </div>
                <div className="feature-card">
                  <PieChart className="feature-icon cx-feature-icon" />
                  <h4 className="feature-title">User-Centered Design</h4>
                  <p className="feature-description">Our team conducts extensive user research and testing to ensure intuitive and effective user experiences.</p>
                </div>
                <div className="feature-card">
                  <Target className="feature-icon cx-feature-icon" />
                  <h4 className="feature-title">Continuous Improvement</h4>
                  <p className="feature-description">We maintain ongoing relationships with clients, collecting feedback to continuously improve delivered solutions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            {projectStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="projects-section" id="projects" ref={projectsRef}>
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-description">
              Our team has successfully delivered diverse projects across various domains.
              Here's a preview of our recent work.
            </p>
          </div>
          
          <div className="projects-grid">
            {featuredProjects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <Layout className="project-icon" />
                </div>
                <div className="project-content">
                  <span className="project-type">{project.type}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <a href="#" className="project-link">
                    View Details <ArrowRight className="link-icon" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="section-action">
            <button className="secondary-button" onClick={() => handleNavigation('/projects')}>
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="contact" ref={contactRef}>
        <div className="section-container cta-container">
          <h2 className="section-title">Ready to Explore Our Work?</h2>
          <p className="section-description cta-description">
            Get in touch to learn more about our projects and how we can help bring your ideas to life.
          </p>
          <div className="cta-buttons">
            <button className="primary-button">
              Contact Us Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-logo">
              <Layout className="logo-icon" />
              <span className="logo-text">TeamShowcase</span>
            </div>
            <div className="footer-social">
              <a href="#" className="social-link"><Github className="social-icon" /></a>
              <a href="#" className="social-link"><Globe className="social-icon" /></a>
            </div>
          </div>
          <hr className="footer-divider" />
          <div className="footer-bottom">
            <p className="copyright">&copy; {new Date().getFullYear()} TeamShowcase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;