import { type ResumeData, type TemplateConfig } from '../context/ResumeContext';

export const generatePortfolioHTML = (data: ResumeData, config: TemplateConfig): string => {
  const isMinimal = config.layout === 'minimal';

  const radiusMap: Record<string, string> = {
    none: '0px',
    small: '8px',
    medium: '16px',
    large: '24px',
    full: '9999px'
  };

  const hexToRgb = (hex: string = '#6366f1'): string => {
    const validHex = hex || '#6366f1';
    const r = parseInt(validHex.slice(1, 3), 16);
    const g = parseInt(validHex.slice(3, 5), 16);
    const b = parseInt(validHex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const styles = `
    :root {
      --primary: ${config.primaryColor || '#6366f1'};
      --primary-rgb: ${hexToRgb(config.primaryColor)};
      --secondary: ${config.secondaryColor || '#a855f7'};
      --font-main: '${config.fontFamily || 'Inter'}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --radius: ${radiusMap[config.borderRadius] || '16px'};
      --bg: #07090e;
      --card-bg: rgba(255, 255, 255, 0.03);
      --card-hover: rgba(255, 255, 255, 0.06);
      --border: rgba(255, 255, 255, 0.08);
      --border-hover: var(--primary);
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    * { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }
    
    body { 
      font-family: var(--font-main); 
      color: var(--text); 
      background: var(--bg); 
      line-height: 1.6;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    .container { max-width: 1140px; margin: 0 auto; padding: 0 2rem; }

    /* Navigation */
    nav {
      position: fixed; top: 0; width: 100%; z-index: 1000;
      transition: var(--transition); padding: 1.75rem 0;
      background: transparent;
    }
    nav.scrolled {
      background: rgba(7, 9, 14, 0.8);
      backdrop-filter: blur(20px);
      padding: 1rem 0;
      border-bottom: 1px solid var(--border);
      box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.4);
    }
    .nav-content { display: flex; justify-content: space-between; align-items: center; }
    .logo { 
      font-weight: 900; 
      font-size: 1.35rem; 
      letter-spacing: -0.03em; 
      background: linear-gradient(135deg, #ffffff, var(--text-muted));
      -webkit-background-clip: text; 
      -webkit-text-fill-color: transparent;
    }
    .nav-actions { display: flex; gap: 1.2rem; align-items: center; }

    /* Hero Section */
    .hero {
      padding: 14rem 0 10rem;
      background: ${isMinimal ? 'var(--bg)' : `radial-gradient(circle at 80% 20%, rgba(var(--primary-rgb), 0.12), transparent), radial-gradient(circle at 20% 80%, rgba(var(--primary-rgb), 0.04), transparent)`};
      text-align: center;
      position: relative;
    }

    .hero h1 {
      font-size: clamp(3.5rem, 9vw, 6.5rem);
      font-weight: 900; line-height: 0.9;
      letter-spacing: -0.05em; margin-bottom: 1.8rem;
    }

    .hero h1 span {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }

    .hero p {
      max-width: 620px; margin: 0 auto 3rem;
      font-size: 1.2rem; color: var(--text-muted);
    }

    /* Buttons */
    .btn {
      padding: 0.9rem 2.2rem; border-radius: var(--radius);
      font-weight: 600; text-decoration: none;
      display: inline-flex; align-items: center; gap: 0.6rem;
      transition: var(--transition); cursor: pointer; border: none;
      font-size: 0.9rem;
    }
    .btn-primary { 
      background: linear-gradient(135deg, var(--primary), var(--secondary)); 
      color: #ffffff; 
      box-shadow: 0 10px 24px -10px rgba(var(--primary-rgb), 0.4); 
    }
    .btn-primary:hover { 
      transform: translateY(-5px) scale(1.01); 
      box-shadow: 0 16px 36px -12px rgba(var(--primary-rgb), 0.5); 
    }
    .btn-outline { 
      border: 1px solid var(--border); 
      color: var(--text); 
      background: rgba(255, 255, 255, 0.02); 
    }
    .btn-outline:hover { 
      background: var(--card-hover); 
      border-color: var(--border-hover);
      transform: translateY(-5px) scale(1.01);
    }

    /* Section Styling */
    section { padding: 120px 0; }
    .section-title { 
      font-size: 2.75rem; 
      font-weight: 800; 
      margin-bottom: 3.5rem; 
      letter-spacing: -0.03em; 
      background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.5) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Bento Grid Layout */
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 1.8rem;
    }
    .bento-item {
      grid-column: span 6;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2.8rem;
      transition: var(--transition);
      backdrop-filter: blur(8px);
    }
    .bento-item:nth-child(3n+1) { grid-column: span 7; }
    .bento-item:nth-child(3n+2) { grid-column: span 5; }
    .bento-item:hover { 
      background: var(--card-hover); 
      border-color: var(--border-hover); 
      transform: translateY(-5px); 
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .item-title {
      font-size: 1.45rem;
      font-weight: 700;
      margin-bottom: 0.4rem;
      color: var(--text);
    }

    .exp-date { 
      font-weight: 700; 
      color: var(--primary); 
      font-size: 0.8rem; 
      text-transform: uppercase; 
      letter-spacing: 0.05em; 
      margin-bottom: 0.8rem; 
    }
    .exp-company { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.2rem; }

    /* Grids */
    .skills-grid, .education-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
      gap: 1.2rem;
    }
    .card-element {
      background: var(--card-bg);
      padding: 1.2rem; text-align: center;
      border-radius: var(--radius);
      font-weight: 600; border: 1px solid var(--border);
      transition: var(--transition);
      backdrop-filter: blur(4px);
      font-size: 0.9rem;
      color: var(--text);
    }
    .card-element:hover { 
      border-color: var(--border-hover); 
      color: var(--primary); 
      background: rgba(255, 255, 255, 0.08); 
      transform: translateY(-3px);
    }

    /* Animations */
    [data-aos] { opacity: 0; transform: translateY(50px); transition: var(--transition); }
    [data-aos].visible { opacity: 1; transform: translateY(0); }
    
    @media (max-width: 768px) {
      .bento-item { grid-column: span 12 !important; }
      .hero h1 { font-size: 3rem; }
      .container { padding: 0 1.2rem; }
      .btn { padding: 0.8rem 1.6rem; font-size: 0.85rem; }
    }
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name || 'Creative'} | Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(config.fontFamily || 'Inter')}:wght@400;600;800;900&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>${styles}</style>
</head>
<body>
  <nav id="navbar">
    <div class="container nav-content">
      <div class="logo">${data.name?.split(' ')[0].toUpperCase() || 'PORTFOLIO'}</div>
      <div class="nav-actions">
        <a href="javascript:void(0)" onclick="document.getElementById('skills').scrollIntoView({behavior: 'smooth'}); return false;" class="btn btn-outline" style="padding: 0.45rem 1.1rem;">Skills</a>
        <a href="javascript:void(0)" onclick="document.getElementById('projects').scrollIntoView({behavior: 'smooth'}); return false;" class="btn btn-outline" style="padding: 0.45rem 1.1rem;">Project</a>
        <a href="javascript:void(0)" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'}); return false;" class="btn btn-primary" style="padding: 0.45rem 1.1rem;">Contact</a>
      </div>
    </div>
  </nav>

  <section class="hero">
    <div class="container">
      <div data-aos>
        <h1>Hello, I'm <span>${data.name?.split(' ')[0] || 'Creative'}</span>.</h1>
        <p>${data.about || 'A passionate professional focused on building impactful digital experiences.'}</p>
        <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
          <a href="javascript:void(0)" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'}); return false;" class="btn btn-primary">
            <i data-lucide="mail"></i> Get in Touch
          </a>
          ${data.github ? `<a href="${data.github}" target="_blank" class="btn btn-outline"><i data-lucide="github"></i> GitHub</a>` : ''}
          ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="btn btn-outline"><i data-lucide="linkedin"></i> LinkedIn</a>` : ''}
        </div>
      </div>
    </div>
  </section>

  <section id="experience">
    <div class="container">
      <h2 class="section-title" data-aos>Selected Experience</h2>
      <div class="bento-grid">
         ${(data.experience || []).map((exp) => `
          <div class="bento-item" data-aos>
            <div class="exp-date">${exp.duration || 'Present'}</div>
            <h3 class="item-title">${exp.position || 'Role'}</h3>
            <div class="exp-company">${exp.company || 'Company'}</div>
            <p style="color:var(--text-muted); font-size:0.95rem;">${exp.description || ''}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section id="skills">
    <div class="container">
      <h2 class="section-title" data-aos>Expertise</h2>
      <div class="skills-grid">
         ${(data.skills || []).map(skill => `
          <div class="card-element" data-aos>
            ${skill}
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  ${data.projects && data.projects.length > 0 ? `
  <section id="projects">
    <div class="container">
      <h2 class="section-title" data-aos>Featured Projects</h2>
      <div class="bento-grid">
        ${data.projects.map(proj => `
          <div class="bento-item" style="grid-column: span 4;" data-aos>
            <i data-lucide="folder" style="color:var(--primary); margin-bottom:1.2rem;"></i>
            <h3 class="item-title">${proj.title || 'Project'}</h3>
            <p style="color:var(--text-muted); font-size:0.92rem;">${proj.description || ''}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>` : ''}

  ${data.education && data.education.length > 0 ? `
  <section id="education">
    <div class="container">
      <h2 class="section-title" data-aos>Education</h2>
      <div class="education-grid">
        ${data.education.map(edu => `
          <div class="card-element" data-aos>
            <i data-lucide="graduation-cap" style="color:var(--primary); margin-bottom: 0.5rem;"></i>
            <h3 class="item-title" style="font-size: 1.1rem;">${edu.institution || 'Institution'}</h3>
            <span style="font-size: 0.85rem; color: var(--text-muted);">${edu.degree || ''} ${edu.year || ''}</span>
          </div>
        `).join('')}
      </div>
    </div>
  </section>` : ''}

  <section id="contact">
    <div class="container">
      <h2 class="section-title" data-aos>Get in Touch</h2>
      <div class="bento-grid">
        ${data.email ? `
          <div class="bento-item" style="grid-column: span 4;" data-aos>
            <i data-lucide="mail" style="color:var(--primary); margin-bottom:1.2rem;"></i>
            <h3 class="item-title" style="font-size:1.2rem;">Email</h3>
            <p style="color:var(--text-muted); font-size:0.92rem; word-break: break-all;">${data.email}</p>
          </div>
        ` : ''}
        ${data.phone ? `
          <div class="bento-item" style="grid-column: span 4;" data-aos>
            <i data-lucide="phone" style="color:var(--primary); margin-bottom:1.2rem;"></i>
            <h3 class="item-title" style="font-size:1.2rem;">Phone</h3>
            <p style="color:var(--text-muted); font-size:0.92rem;">${data.phone}</p>
          </div>
        ` : ''}
        ${data.location ? `
          <div class="bento-item" style="grid-column: span 4;" data-aos>
            <i data-lucide="map-pin" style="color:var(--primary); margin-bottom:1.2rem;"></i>
            <h3 class="item-title" style="font-size:1.2rem;">Address</h3>
            <p style="color:var(--text-muted); font-size:0.92rem;">${data.location}</p>
          </div>
        ` : ''}
      </div>
    </div>
  </section>

  <footer style="padding: 4.5rem 0; text-align: center; border-top: 1px solid var(--border);">
    <div class="container">
      <p style="color:var(--text-muted); font-size: 0.88rem;">© ${new Date().getFullYear()} ${data.name || 'Creative'}. Built with Passion.</p>
    </div>
  </footer>

  <script>
    // Initialize Lucide Icons
    lucide.createIcons();

    // Scroll Observer for Animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  </script>
</body>
</html>`;
};