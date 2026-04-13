document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 100);

    const translations = {
        en: {
            nav_home: "Home", nav_about: "About", nav_projects: "Projects", nav_contact: "Contact",
            see_work: "See my work",
            greeting_home: "Welcome", greeting_other: "Hey",
            role: "Full-stack Developer", btn_contact: "Contact me",
            about_title: "About",
            about_p1: "Hi, I am Gabriel and I'm a developer passionate about technology, problem-solving, and building high-quality software. With experience in full stack web development, I focus on creating solutions that are not only functional, but also performant, scalable, and maintainable.",
            about_p2: "I'm always exploring new technologies, improving my skills, and studying modern software architecture patterns. I believe in clean code, automated testing, and continuous delivery as foundations for building reliable and impactful applications.",
            stack_title: "Stack", projects_title: "Projects", filter_all: "All",
            contact_title: "Contact", whatsapp_title: "Whatsapp", follow_title: "Follow me"
        },
        pt: {
            nav_home: "Início", nav_about: "Sobre", nav_projects: "Projetos", nav_contact: "Contato",
            see_work: "Veja meu trabalho",
            greeting_home: "Bem-vindo", greeting_other: "Olá",
            role: "Desenvolvedor Full-stack", btn_contact: "Fale comigo",
            about_title: "Sobre",
            about_p1: "Olá, sou o Gabriel e sou um desenvolvedor apaixonado por tecnologia, resolução de problemas e criação de software de alta qualidade. Com experiência em desenvolvimento web full stack, meu foco é criar soluções não apenas funcionais, mas também performáticas, escaláveis e de fácil manutenção.",
            about_p2: "Estou sempre explorando novas tecnologias, aprimorando minhas habilidades e estudando os padrões modernos de arquitetura de software. Acredito que um código limpo, testes automatizados e entrega contínua são os pilares para construir aplicações confiáveis e de impacto.",
            stack_title: "Tecnologias", projects_title: "Projetos", filter_all: "Todos",
            contact_title: "Contato", whatsapp_title: "Whatsapp", follow_title: "Siga-me"
        }
    };

    let currentLang = 'en';
    const btnTranslate = document.getElementById('btn-translate');
    const langIndicator = document.getElementById('lang-indicator');

    function updateTexts() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.textContent = translations[currentLang][key];
            }
        });
        
        const currentPage = document.body.getAttribute('data-current-page');
        const greetingText = document.getElementById('greeting-text');
        greetingText.textContent = translations[currentLang][currentPage === 'home' ? 'greeting_home' : 'greeting_other'];

        langIndicator.textContent = currentLang === 'en' ? "Português" : "Inglês";
    }

    if(btnTranslate) {
        btnTranslate.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'pt' : 'en';
            updateTexts();
        });
    }

    const projectFilters = document.querySelectorAll('.projects-filters span');
    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            projectFilters.forEach(f => f.classList.remove('active-filter'));
            filter.classList.add('active-filter');
        });
    });

    const navLinks = document.querySelectorAll('#nav-menu a');
    const sections = document.querySelectorAll('.page-content');
    const mainHeader = document.getElementById('main-header');
    const greetingText = document.getElementById('greeting-text');

    document.body.setAttribute('data-current-page', 'home');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            const currentPage = document.body.getAttribute('data-current-page');
            
            if (currentPage === targetPage) return;

            mainHeader.classList.remove('initial-load');
            
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            document.body.setAttribute('data-current-page', targetPage);

            sections.forEach(sec => {
                sec.classList.remove('active');
                if(sec.id === 'page-' + targetPage) {
                    setTimeout(() => { sec.classList.add('active'); }, 50);
                }
            });

            if (targetPage === 'home') {
                mainHeader.classList.remove('header-top');
                mainHeader.classList.add('header-home');
                greetingText.textContent = translations[currentLang]['greeting_home'];
            } else {
                mainHeader.classList.remove('header-home');
                mainHeader.classList.add('header-top');
                greetingText.textContent = translations[currentLang]['greeting_other'];
            }
        });
    });
});
