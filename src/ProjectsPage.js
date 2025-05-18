import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowRight, Layout, Search, Filter, Grid, List, ArrowLeft, 
  ArrowRight as ArrowRightIcon, ExternalLink, X, 
  Calendar, User, Building, Briefcase, CheckCircle, Code, Users,
  Share2, Linkedin, Twitter, Facebook, Clock, CheckCircle2, Timer
} from 'lucide-react';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const projectsRef = useRef(null);

  // State for the modal
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [animatedItems, setAnimatedItems] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Parse URL parameters for persistent state
  const getInitialState = () => {
    const params = new URLSearchParams(location.search);
    return {
      viewMode: params.get('view') || 'grid',
      activeCategory: params.get('category') || 'all',
      activeStatus: params.get('status') || 'all',
      currentPage: parseInt(params.get('page') || '1', 10),
      scrollPosition: parseInt(params.get('scroll') || '0', 10)
    };
  };

  const [viewMode, setViewMode] = useState(getInitialState().viewMode);
  const [activeCategory, setActiveCategory] = useState(getInitialState().activeCategory);
  const [activeStatus, setActiveStatus] = useState(getInitialState().activeStatus);
  const [currentPage, setCurrentPage] = useState(getInitialState().currentPage);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample project data - in a real app, this would come from an API
  const projects = [
    { 
      id: 1, 
      title: 'PMT 1.0.0',
      description: 'A centralized paperwork management platform designed to streamline operations across business units and teams. It provides seamless access to real-time status updates, edit capabilities, and organized views categorized by business unit and team hierarchy, ensuring better collaboration, visibility, and accountability across the organization.',
      type: 'Web Development',
      team: 'Delivery',
      completionDate: 'March 15, 2025',
      client: 'VDart Inc.',
      image: 'ecommerce',
      status: 'completed',
      siteUrl: 'https://pmt.vdart.com',
      bgColor: 'blue',
      progress: 100,
      longDescription: `The Paperwork Management Tool (PMT) 1.0.0 represents a major innovation in our operational workflow. Developed to address the growing complexity of managing paperwork across our expanding organization, this platform centralizes all document processes into a unified system accessible to team members at all levels.

      Every aspect of the platform was meticulously designed to streamline workflows, reduce administrative overhead, and ensure compliance with internal and external regulations. The system introduces real-time collaborative editing, advanced search capabilities, and granular permission controls that have revolutionized how teams interact with documentation.`,
      features: [
        'Real-time status updates with notification system',
        'Collaborative editing with version control',
        'Hierarchical views organized by business unit and team',
        'Advanced search and filtering capabilities',
        'Comprehensive user activity logging',
        'Automated approval workflows',
        'Document template library with customization options'
      ],
      technologies: [
        'HTML', 'CSS', 'PHP', 'MySQL', 'JS'
      ],
      teamMembers: [
        { name: 'Ibrahim Khaleelullah', role: 'Project Manager' },
        { name: 'Saranraj S', role: 'Associate Developer' }
      ],
      stats: [
        { value: '85%', label: 'Efficiency Increase' },
        { value: '3,500+', label: 'Documents Processed' },
        { value: '8', label: 'Business Units' },
        { value: '150+', label: 'Active Users' }
      ],
      duration: '6 months',
      galleryImages: ['pmt-dashboard', 'pmt-document-view', 'pmt-reports', 'pmt-mobile', 'pmt-settings', 'pmt-teams']
    },
    { 
      id: 2, 
      title: 'PMT 1.0.1',
      description: 'An upgraded version of the platform featuring an intuitive and user-friendly interface, enriched dashboards for actionable insights, and automated email notifications for every key update. It also includes a comprehensive logging system to ensure precise data tracking and accountability across all user activities.',
      type: 'Full Stack',
      team: 'Delivery',
      completionDate: 'January 30, 2025',
      client: 'VDart Inc.',
      image: 'healthcare',
      status: 'completed',
      siteUrl: 'https://pmt-v2.vdart.com',
      bgColor: 'lightBlue',
      progress: 100,
      longDescription: `Building on the success of PMT 1.0.0, this update represents a significant enhancement to both user experience and functionality. The upgrade was driven by extensive user feedback and operational metrics collected over the first six months of deployment.`,
      features: [
        'Redesigned intuitive user interface with dark mode support',
        'Enhanced real-time dashboards with customizable widgets',
        'Multi-channel notification system (email, in-app, mobile)',
        'Advanced logging with audit trail capabilities'
      ],
      technologies: [
        'HTML', 'CSS', 'PHP', 'MySQL', 'JS'
      ],
      teamMembers: [
        { name: 'Ibrahim Khaleelullah', role: 'Project Manager' },
        { name: 'Saranraj S', role: 'Associate Developer' }
      ],
      stats: [
        { value: '42%', label: 'Faster Processing' },
        { value: '95%', label: 'User Satisfaction' },
        { value: '12', label: 'New Features' },
        { value: '200+', label: 'Active Users' }
      ]
    },
    { 
      id: 3, 
      title: 'VDart Brand Desk',
      description: 'A centralized branding tool designed to standardize communication across the organization. It ensures consistent branding by integrating company-approved email signatures, LinkedIn logos, and banners, streamlining the candidate engagement process with a unified and professional appearance.',
      type: 'Web Application',
      team: 'CX',
      completionDate: 'April 2, 2025',
      client: 'VDart Inc.',
      image: 'realestate',
      status: 'completed',
      siteUrl: 'https://branddesk.vdart.com',
      bgColor: 'purple',
      progress: 100
    },
    { 
      id: 4, 
      title: 'Shoutout Corp-Comms',
      description: 'An interactive recognition platform that enables employees to send appreciation to colleagues through a mobile-friendly QR scanner system. This tool fosters a culture of gratitude and engagement, allowing team members to submit and view shoutouts seamlessly across devices.',
      type: 'Data Visualization',
      team: 'Delivery',
      completionDate: 'February 28, 2025',
      client: 'VDart Inc.',
      image: 'finance',
      status: 'completed',
      siteUrl: 'https://shoutout.vdart.com',
      bgColor: 'green',
      progress: 100
    },
    { 
      id: 5, 
      title: 'CX - Management Portal',
      description: 'A centralized dashboard that allows managers to securely log in and access weekly and monthly performance reports for all team members across CX, RD, and RM functions. The portal simplifies data visibility, enabling leadership to make informed decisions through intuitive visual reports and structured team insights.',
      type: 'E-Learning',
      team: 'CX',
      completionDate: 'March 20, 2025',
      client: 'VDart Inc.',
      image: 'education',
      status: 'completed',
      siteUrl: 'https://cx-portal.vdart.com',
      bgColor: 'orange',
      progress: 100
    },
    { 
      id: 6, 
      title: 'Scrapping Extension',
      description: 'A productivity-boosting browser extension designed to automate data entry by extracting key information directly from PMT and seamlessly populating it into CEIPAL with a single click. This tool significantly reduces manual effort, ensures data accuracy, and accelerates the submission process.',
      type: 'Enterprise Solution',
      team: 'Delivery',
      completionDate: 'February 10, 2025',
      client: 'VDart Inc.',
      image: 'logistics',
      status: 'completed',
      siteUrl: 'https://chrome.google.com/webstore/detail/vdart-scrapper',
      bgColor: 'pink',
      progress: 100
    },
    { 
      id: 7, 
      title: 'HR Exit Interview Form',
      description: 'A streamlined digital form system to collect and analyze employee exit interviews. Provides HR with actionable insights and reporting capabilities to improve retention and address workplace concerns identified during the exit process.',
      type: 'Web Application',
      team: 'Delivery',
      completionDate: 'July 15, 2025',
      client: 'VDart Inc.',
      image: 'finance',
      status: 'ongoing',
      siteUrl: 'https://hr-exit.vdart.com',
      bgColor: 'green',
      progress: 75
    },
    { 
      id: 8, 
      title: 'VDart Candidate Portal',
      description: 'A comprehensive portal that empowers candidates to track their application status, access relevant resources, complete required documentation, and communicate directly with recruiters. Enhances the overall candidate experience and streamlines the recruitment workflow.',
      type: 'Web Portal',
      team: 'CX',
      completionDate: 'August 30, 2025',
      client: 'VDart Inc.',
      image: 'education',
      status: 'ongoing',
      siteUrl: 'https://candidates.vdart.com',
      bgColor: 'blue',
      progress: 60
    },
    { 
      id: 9, 
      title: 'VDart Resume Search Engine',
      description: 'An AI-powered search engine that allows recruiters to quickly find the most relevant candidate resumes based on skills, experience, and job requirements. Features semantic search capabilities, skill mapping, and advanced filtering to dramatically improve talent matching efficiency.',
      type: 'AI Application',
      team: 'Delivery',
      completionDate: 'October 15, 2025',
      client: 'VDart Inc.',
      image: 'finance',
      status: 'upcoming',
      siteUrl: 'https://resume-search.vdart.com',
      bgColor: 'orange',
      progress: 15
    },
    { 
      id: 10, 
      title: 'Resume Scoring System',
      description: 'An automated tool that evaluates candidate resumes against job requirements, providing objective scoring and highlighting matching skills. Helps recruiters quickly identify top candidates and standardize the initial screening process while reducing unconscious bias.',
      type: 'Machine Learning',
      team: 'Delivery',
      completionDate: 'November 30, 2025',
      client: 'VDart Inc.',
      image: 'logistics',
      status: 'upcoming',
      siteUrl: 'https://resume-score.vdart.com',
      bgColor: 'purple',
      progress: 5
    },
    { 
      id: 11, 
      title: 'Career Form Integration with CEIPAL',
      description: 'A seamless integration between the company career page application forms and the CEIPAL ATS, automatically creating candidate profiles and job applications in real-time. Eliminates manual data entry, reduces processing time, and improves candidate data accuracy.',
      type: 'API Integration',
      team: 'CX',
      completionDate: 'January 15, 2026',
      client: 'VDart Inc.',
      image: 'healthcare',
      status: 'upcoming',
      siteUrl: 'https://careers.vdart.com',
      bgColor: 'green',
      progress: 10
    },
    { 
      id: 12, 
      title: 'Portal Management System (PMS)',
      description: 'A comprehensive analytics platform that tracks and manages usage reports and ROI summaries across multiple job portals including CareerBuilder, Dice, Monster, and LinkedIn. The system provides geographical insights and portal-specific performance metrics to optimize recruitment investments.',
      type: 'Analytics Platform',
      team: 'Delivery',
      completionDate: 'April 25, 2025',
      client: 'VDart Inc.',
      image: 'analytics',
      status: 'completed',
      siteUrl: 'https://pms.vdart.com',
      bgColor: 'blue',
      progress: 100,
      longDescription: `The Portal Management System (PMS) was developed to address the critical need for data-driven decision making in our recruitment portal investments. With significant annual spending across multiple job boards including CareerBuilder, Dice, Monster, and LinkedIn, the organization needed clear visibility into the ROI and performance metrics of each platform.`,
      features: [
        'Interactive dashboards with geographical heat maps of portal performance',
        'Portal-specific ROI calculators and comparison tools',
        'Automated data collection from multiple job board APIs',
        'Custom reporting with export capabilities (PDF, Excel, CSV)'
      ],
      technologies: [
        'React.js', 'Node.js', 'PostgreSQL', 'Chart.js', 'REST APIs', 'AWS'
      ],
      teamMembers: [
        { name: 'Ibrahim Khaleelullah', role: 'Project Manager' },
        { name: 'Mohan Kumar', role: 'Assistant Manager' }
      ],
      stats: [
        { value: '32%', label: 'Recruitment Cost Reduction' },
        { value: '8', label: 'Integrated Job Portals' },
        { value: '15+', label: 'Geographical Regions' },
        { value: '$250K+', label: 'Annual Savings' }
      ]
    },
    { 
      id: 13, 
      title: 'Email Generator',
      description: 'An automated tool that streamlines corporate communications by instantly generating professional email templates. Users simply upload images and content, and the system formats everything according to brand guidelines, eliminating manual drafting and ensuring consistency across all communications.',
      type: 'Productivity Tool',
      team: 'CX',
      completionDate: 'May 5, 2025',
      client: 'VDart Inc.',
      image: 'email',
      status: 'completed',
      siteUrl: 'https://email-generator.vdart.com',
      bgColor: 'green',
      progress: 100,
      longDescription: `The Email Generator was developed to address the significant time investment required for creating consistent corporate communications. Prior to this solution, team members spent hours manually formatting emails for various communication types, often resulting in inconsistent branding and presentation across departments.`,
      features: [
        'Drag-and-drop interface for content and image uploads',
        'Library of pre-approved templates for different communication types',
        'Real-time preview with mobile and desktop views',
        'One-click HTML generation with copy functionality'
      ],
      technologies: [
        'React.js', 'Node.js', 'MJML', 'AWS S3', 'TinyMCE', 'CSS', 'Bootstrap'
      ],
      teamMembers: [
        { name: 'Ibrahim Khaleelullah', role: 'Project Manager' },
        { name: 'Saranraj S', role: 'Associate Developer' }
      ],
      stats: [
        { value: '85%', label: 'Time Saved per Email' },
        { value: '100%', label: 'Brand Compliance' },
        { value: '300+', label: 'Monthly Emails Generated' },
        { value: '24', label: 'Available Templates' }
      ]
    }
  ];

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('view', viewMode);
    params.set('category', activeCategory);
    params.set('status', activeStatus);
    params.set('page', currentPage.toString());
    
    // Update URL without full page reload
    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  }, [viewMode, activeCategory, activeStatus, currentPage, navigate, location.pathname]);

  // Scroll restoration
  useEffect(() => {
    const initialState = getInitialState();
    
    // If there's a saved scroll position, restore it
    if (initialState.scrollPosition > 0) {
      window.scrollTo(0, initialState.scrollPosition);
    }
    
    // Save scroll position before user navigates away
    const handleBeforeUnload = () => {
      const params = new URLSearchParams(location.search);
      params.set('scroll', window.scrollY.toString());
      navigate({
        pathname: location.pathname,
        search: params.toString()
      }, { replace: true });
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate, location]);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter projects by category, status, and search query
  const filteredProjects = projects
    .filter(project => 
      activeCategory === 'all' 
        ? true 
        : activeCategory === 'delivery' 
          ? project.team === 'Delivery' 
          : project.team === 'CX'
    )
    .filter(project =>
      activeStatus === 'all'
        ? true
        : project.status === activeStatus
    )
    .filter(project => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.type.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query)
      );
    });

  // Pagination
  const projectsPerPage = 6;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Animate items when they come into view
  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setAnimatedItems(prev => [...prev, parseInt(entry.target.dataset.id)]);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      const projectItems = document.querySelectorAll('.project-item');
      projectItems.forEach(item => {
        observer.observe(item);
      });

      return () => {
        projectItems.forEach(item => {
          observer.unobserve(item);
        });
      };
    }
  }, [isLoading, currentPage, filteredProjects]);

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Get status icon and label
  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return { 
          icon: <CheckCircle2 className="status-icon completed" />,
          label: 'Completed',
          className: 'status-completed'
        };
      case 'ongoing':
        return { 
          icon: <Clock className="status-icon ongoing" />,
          label: 'Ongoing',
          className: 'status-ongoing'
        };
      case 'upcoming':
        return { 
          icon: <Timer className="status-icon upcoming" />,
          label: 'Upcoming',
          className: 'status-upcoming'
        };
      default:
        return { 
          icon: <CheckCircle2 className="status-icon" />,
          label: 'Unknown',
          className: 'status-unknown' 
        };
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Reset animations for new page
    setAnimatedItems([]);
    // Scroll to top of projects section with smooth animation
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Change view mode with animation
  const changeViewMode = (mode) => {
    if (mode === viewMode) return;
    
    setViewMode(mode);
    setAnimatedItems([]); // Reset animations for new view mode
  };

  // Change category with animation
  const changeCategory = (category) => {
    if (category === activeCategory) return;
    
    setActiveCategory(category);
    setCurrentPage(1);
    setAnimatedItems([]);
  };

  // Change status with animation
  const changeStatus = (status) => {
    if (status === activeStatus) return;
    
    setActiveStatus(status);
    setCurrentPage(1);
    setAnimatedItems([]);
  };

  // For consistent background colors based on project ID
  const getBackgroundClass = (project) => {
    return `project-image bg-${project.bgColor}`;
  };

  // Handle view details click
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Close modal with animation
  const closeModal = () => {
    const modal = document.querySelector('.project-modal-overlay');
    if (modal) {
      modal.classList.add('modal-closing');
      setTimeout(() => {
        setIsModalOpen(false);
      }, 300);
    } else {
      setIsModalOpen(false);
    }
  };

  // Loading placeholders for projects
  const renderSkeletonLoaders = () => (
    <div className="projects-container grid-view">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="project-item loading-card">
          <div className="project-image"></div>
          <div className="project-content">
            <div className="skeleton-line skeleton-type"></div>
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-description"></div>
            <div className="skeleton-line skeleton-description"></div>
            <div className="skeleton-line skeleton-description"></div>
            <div className="skeleton-meta">
              <div className="skeleton-line skeleton-meta-item"></div>
              <div className="skeleton-line skeleton-meta-item"></div>
            </div>
            <div className="skeleton-line skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Format team members for display
  const formatTeamMember = (member) => {
    return (
      <li key={member.name}>
        <span className="modal-team-name">{member.name}</span>
        <span className="modal-team-role">{member.role}</span>
      </li>
    );
  };

  // Render project details modal
  const renderProjectDetailsModal = () => {
    if (!selectedProject) return null;

    const statusInfo = getStatusInfo(selectedProject.status);

    return (
      <div className={`project-modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={closeModal}>
        <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-button" onClick={closeModal}>
            <X size={24} />
          </button>

          <div className="modal-header" style={{backgroundImage: `linear-gradient(135deg, var(--bg-${selectedProject.bgColor}-start), var(--bg-${selectedProject.bgColor}-end))`}}>
            <div className="modal-header-content">
              <div className="modal-header-top">
                <span className={`team-badge ${selectedProject.team === 'Delivery' ? 'delivery-badge' : 'cx-badge'}`}>
                  {selectedProject.team} Team
                </span>
                <span className={`status-badge ${statusInfo.className}`}>
                  {statusInfo.icon} {statusInfo.label}
                </span>
              </div>
              <h2 className="modal-title">{selectedProject.title}</h2>
              <div className="modal-header-meta">
                <div className="modal-header-meta-item">
                  <Calendar size={16} className="modal-header-meta-icon" />
                  <span>{selectedProject.completionDate}</span>
                </div>
                <div className="modal-header-meta-item">
                  <Building size={16} className="modal-header-meta-icon" />
                  <span>{selectedProject.client}</span>
                </div>
                <div className="modal-header-meta-item">
                  <Briefcase size={16} className="modal-header-meta-icon" />
                  <span>{selectedProject.type}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-scrollable">
            <div className="modal-body">
              <div className="modal-main-content">
                {selectedProject.status !== 'completed' && (
                  <div className="modal-section">
                    <h3 className="modal-section-title">Project Progress</h3>
                    <div className="progress-container progress-animation">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{width: `${selectedProject.progress}%`}}
                        ></div>
                      </div>
                      <div className="progress-percentage">{selectedProject.progress}% Complete</div>
                    </div>
                  </div>
                )}
                
                <div className="modal-section">
                  <h3 className="modal-section-title"><Briefcase size={20} /> Project Overview</h3>
                  <div className="modal-overview">
                    {selectedProject.longDescription 
                      ? selectedProject.longDescription.split('\n\n').map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))
                      : <p>{selectedProject.description}</p>
                    }
                  </div>
                </div>
                
                {selectedProject.features && (
                  <div className="modal-section">
                    <h3 className="modal-section-title"><CheckCircle size={20} /> Key Features</h3>
                    <ul className="modal-features-list">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>
                          <CheckCircle size={18} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedProject.technologies && (
                  <div className="modal-section">
                    <h3 className="modal-section-title"><Code size={20} /> Technologies Used</h3>
                    <div className="modal-tags">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="modal-tag">
                          <Code size={16} />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Placeholder for gallery - in a real implementation, you would load actual images */}
                <div className="modal-section">
                  <h3 className="modal-section-title">Project Gallery</h3>
                  <div className="project-gallery">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="gallery-item">
                        <div className={getBackgroundClass(selectedProject)}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedProject.stats && selectedProject.teamMembers && (
                <div className="modal-sidebar">
                  <div className="modal-section">
                    <h3 className="modal-section-title">Project Stats</h3>
                    <div className="project-stats">
                      {selectedProject.stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                          <div className="stat-value">{stat.value}</div>
                          <div className="stat-label">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="modal-section">
                    <h3 className="modal-section-title"><Users size={20} /> Team Members</h3>
                    <ul className="modal-team-list">
                      {selectedProject.teamMembers.map((member) => formatTeamMember(member))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="modal-footer">
            <div className="modal-share-buttons">
              <button className="modal-share-button">
                <Linkedin size={18} />
              </button>
              <button className="modal-share-button">
                <Twitter size={18} />
              </button>
              <button className="modal-share-button">
                <Facebook size={18} />
              </button>
              <button className="modal-share-button">
                <Share2 size={18} />
              </button>
            </div>
            
            {selectedProject.status === 'completed' ? (
              <a 
                href={selectedProject.siteUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="modal-site-link"
              >
                Visit Live Site <ExternalLink size={18} />
              </a>
            ) : (
              <button className="modal-status-button">
                {selectedProject.status === 'ongoing' ? 'In Development' : 'Coming Soon'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="projects-page">
      {/* Navigation */}
      <nav className="navbar navbar-scrolled">
        <div className="navbar-container">
          <div className="logo-container">
            <Layout className="logo-icon" />
            <span className="logo-text">TeamShowcase</span>
          </div>
          
          <div className="desktop-nav">
            <a href="/" className="nav-link">Home</a>
            <a href="/projects" className="nav-link active">Projects</a>
            <a href="/team" className="nav-link">Team</a>
            <a href="/contact" className="nav-link">Contact</a>
            <div className="auth-buttons">
              <button className="login-button">
                Login
              </button>
              <button className="signup-button">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Projects Header */}
      <header className="projects-header">
        <div className="header-bg"></div>
        <div className="container">
          <h1>Our Projects<span className="heading-underline"></span></h1>
          <p>Browse through our portfolio of successful project deliveries across various industries and technologies.</p>
        </div>
      </header>

      {/* Filters and Search */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-container">
            <div className="filter-group">
              <h4 className="filter-label">Team:</h4>
              <div className="category-filters">
                <button 
                  className={`category-button ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => changeCategory('all')}
                >
                  All Teams
                </button>
                <button 
                  className={`category-button ${activeCategory === 'delivery' ? 'active' : ''}`}
                  onClick={() => changeCategory('delivery')}
                >
                  Delivery
                </button>
                <button 
                  className={`category-button ${activeCategory === 'cx' ? 'active' : ''}`}
                  onClick={() => changeCategory('cx')}
                >
                  CX
                </button>
              </div>
            </div>
            
            <div className="filter-group">
              <h4 className="filter-label">Status:</h4>
              <div className="status-filters">
                <button 
                  className={`status-button ${activeStatus === 'all' ? 'active' : ''}`}
                  onClick={() => changeStatus('all')}
                >
                  All Statuses
                </button>
                <button 
                  className={`status-button completed ${activeStatus === 'completed' ? 'active' : ''}`}
                  onClick={() => changeStatus('completed')}
                >
                  <CheckCircle2 size={14} className="status-filter-icon" /> Completed
                </button>
                <button 
                  className={`status-button ongoing ${activeStatus === 'ongoing' ? 'active' : ''}`}
                  onClick={() => changeStatus('ongoing')}
                >
                  <Clock size={14} className="status-filter-icon" /> Ongoing
                </button>
                <button 
                  className={`status-button upcoming ${activeStatus === 'upcoming' ? 'active' : ''}`}
                  onClick={() => changeStatus('upcoming')}
                >
                  <Timer size={14} className="status-filter-icon" /> Upcoming
                </button>
              </div>
            </div>
            
            <div className="search-and-view">
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Search className="search-icon" />
              </div>
              
              <div className="view-options">
                <button 
                  className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => changeViewMode('grid')}
                >
                  <Grid size={20} />
                </button>
                <button 
                  className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => changeViewMode('list')}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-list-section" ref={projectsRef}>
        <div className="container">
          {isLoading ? (
            renderSkeletonLoaders()
          ) : filteredProjects.length === 0 ? (
            <div className="no-results">
              <h3>No projects found</h3>
              <p>Try adjusting your search criteria or category selection.</p>
            </div>
          ) : (
            <div className={`projects-container ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
              {currentProjects.map(project => {
                const statusInfo = getStatusInfo(project.status);
                const isAnimated = animatedItems.includes(project.id);
                
                return (
                  <div 
                    key={project.id} 
                    className={`project-item ${project.status} ${isAnimated ? 'animated' : ''}`}
                    data-id={project.id}
                  >
                    <div className={getBackgroundClass(project)}>
                      <span className={`team-badge ${project.team === 'Delivery' ? 'delivery-badge' : 'cx-badge'}`}>
                        {project.team} Team
                      </span>
                      
                      {/* Progress bar for ongoing and upcoming projects */}
                      {project.status !== 'completed' && (
                        <div className="project-progress-container">
                          <div className="project-progress-bar">
                            <div 
                              className="project-progress-fill" 
                              style={{width: isAnimated ? `${project.progress}%` : '0%'}}
                            ></div>
                          </div>
                          <span className="project-progress-text">{project.progress}%</span>
                        </div>
                      )}
                    </div>
                    <div className="project-content">
                      <div className="project-info">
                        <div className="project-header">
                          <span className="project-type">{project.type}</span>
                          <span className={`project-status ${statusInfo.className}`}>
                            {statusInfo.icon}
                            <span className="project-status-text">{statusInfo.label}</span>
                          </span>
                        </div>
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        <div className="project-meta">
                          <span className="meta-item">Client: {project.client}</span>
                          <span className="meta-item">
                            {project.status === 'completed' 
                              ? `Completed: ${project.completionDate}`
                              : `Target: ${project.completionDate}`
                            }
                          </span>
                        </div>
                      </div>
                      <div className="project-actions">
                        <button 
                          className="project-link project-link-hover"
                          onClick={() => handleViewDetails(project)}
                        >
                          View Details <ArrowRightIcon className="link-icon" />
                        </button>
                        
                        {project.status === 'completed' ? (
                          <a 
                            href={project.siteUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="project-site-link project-link-hover"
                          >
                            Visit Site <ExternalLink className="link-icon" size={16} />
                          </a>
                        ) : (
                          <span className="project-status-label">
                            {project.status === 'ongoing' ? 'In Development' : 'Coming Soon'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-button"
                disabled={currentPage === 1}
                onClick={() => paginate(Math.max(currentPage - 1, 1))}
              >
                <ArrowLeft size={16} />
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                className="pagination-button"
                disabled={currentPage === totalPages}
                onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
              >
                <ArrowRightIcon size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-top-button project-link-hover"
        >
          <ArrowLeft size={24} className="scroll-top-icon" />
        </button>
      )}

      {/* Project Details Modal */}
      {isModalOpen && renderProjectDetailsModal()}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-logo">
              <Layout className="logo-icon" />
              <span className="logo-text">TeamShowcase</span>
            </div>
            <div className="footer-social">
              {['LinkedIn', 'Twitter', 'Facebook', 'Instagram'].map(social => (
                <a key={social} href="#" className="social-link">
                  <Layout className="social-icon" />
                  <span className="social-name">{social}</span>
                </a>
              ))}
            </div>
          </div>
          <hr className="footer-divider" />
          <div className="footer-bottom">
            <p className="copyright">&copy; {new Date().getFullYear()} TeamShowcase. All rights reserved.</p>
            <div className="footer-links">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectsPage;