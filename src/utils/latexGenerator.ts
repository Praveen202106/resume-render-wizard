
import { CVData, Entry, Publication, CustomSection, Technologies } from '../types/cv';

export const generateLatexCode = (data: CVData): string => {
  const {
    personalInfo,
    customSections,
    sectionEntries,
    publications,
    technologies,
    styleSettings
  } = data;

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const generateEntry = (entry: Entry) => {
    if (entry.isOneColumn) {
      return `
        \\begin{onecolentry}
            ${entry.leftTitle}
            ${entry.bulletPoints.length > 0 ? `
            \\begin{highlights}
                ${entry.bulletPoints.map(point => `\\item ${point}`).join('\n                ')}
            \\end{highlights}` : ''}
        \\end{onecolentry}`;
    } else {
      return `
        \\begin{twocolentry}{
            ${entry.location ? `\\textit{${entry.location}}` : ''}${entry.location && entry.dateRange ? '\\\\' : ''}
            ${entry.dateRange ? `\\textit{${entry.dateRange}}` : ''}
        }
            \\textbf{${entry.leftTitle}}
            ${entry.subtitle ? `\\\\\\textit{${entry.subtitle}}` : ''}
        \\end{twocolentry}

        ${entry.bulletPoints.length > 0 ? `\\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}
                ${entry.bulletPoints.map(point => `\\item ${point}`).join('\n                ')}
            \\end{highlights}
        \\end{onecolentry}` : ''}`;
    }
  };

  const generatePublications = (pubs: Publication[]) => {
    return pubs.map(pub => `
        \\begin{samepage}
            \\begin{twocolentry}{
                ${formatDate(pub.date)}
            }
                \\textbf{${pub.title}}

                \\vspace{0.10 cm}

                ${pub.authors}
            \\end{twocolentry}

            ${pub.doiUrl ? `\\vspace{0.10 cm}
            \\begin{onecolentry}
                \\href{${pub.doiUrl}}{${pub.doiUrl}}
            \\end{onecolentry}` : ''}
        \\end{samepage}`).join('\n\n        \\vspace{0.2 cm}\n\n');
  };

  const generateTechnologies = (tech: Technologies) => {
    if (!tech.categories || tech.categories.length === 0) return '';
    
    return tech.categories.map(category => `
        \\begin{onecolentry}
            \\textbf{${category.name}:} ${category.items.join(', ')}
        \\end{onecolentry}`).join('\n\n        \\vspace{0.2 cm}\n\n');
  };

  const generateCustomSectionFields = (fields: any[]) => {
    return fields.map(field => `
        \\begin{twocolentry}{
            ${field.rightSection ? `\\textit{${field.rightSection}}` : ''}${field.rightSection && field.rightSubSection ? '\\\\' : ''}
            ${field.rightSubSection ? `\\textit{${field.rightSubSection}}` : ''}
        }
            \\textbf{${field.mainHeading}}
            ${field.subHeading ? `\\\\\\textit{${field.subHeading}}` : ''}
        \\end{twocolentry}

        ${field.bulletPoints && field.bulletPoints.length > 0 ? `\\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}
                ${field.bulletPoints.map((point: string) => `\\item ${point}`).join('\n                ')}
            \\end{highlights}
        \\end{onecolentry}` : ''}`).join('\n\n        \\vspace{0.2 cm}\n\n');
  };

  const generateSectionContent = (section: CustomSection) => {
    if (!section.settings.visible) return '';

    const topMargin = section.settings.topMargin || 0.5;
    const titleLineSpacing = 0.2;
    const bottomMargin = section.settings.bottomMargin || 0.4;

    let content = '';
    
    switch (section.type) {
      case 'entries':
        const entries = sectionEntries[section.id] || [];
        if (entries.length === 0) return '';
        content = entries.map(entry => generateEntry(entry)).join('\n\n        \\vspace{0.2 cm}\n\n');
        break;

      case 'publications':
        if (publications.length === 0) return '';
        content = generatePublications(publications);
        break;

      case 'technologies':
        if (!technologies.categories || technologies.categories.length === 0) return '';
        content = generateTechnologies(technologies);
        break;

      case 'custom':
        const customFields = data.customSectionFields[section.id] || [];
        if (customFields.length === 0) return '';
        content = generateCustomSectionFields(customFields);
        break;

      default:
        return '';
    }

    return `
    \\mysection[${section.settings.showLine}]{${section.settings.title}}{${topMargin}cm}{${titleLineSpacing}cm}{${bottomMargin}cm}
    ${content}`;
  };

  // Sort sections by order
  const sortedSections = [...customSections].sort((a, b) => a.settings.order - b.settings.order);

  return `\\documentclass[10pt, letterpaper]{article}

% Packages:
\\usepackage[
    ignoreheadfoot,
    top=${styleSettings.pageMargins.top} cm,
    bottom=${styleSettings.pageMargins.bottom} cm,
    left=${styleSettings.pageMargins.left} cm,
    right=${styleSettings.pageMargins.right} cm,
    footskip=1.0 cm,
]{geometry}
\\usepackage{titlesec}
\\usepackage{tabularx}
\\usepackage{array}
\\usepackage[dvipsnames]{xcolor}
\\definecolor{primaryColor}{RGB}{0, 79, 144}
\\usepackage{enumitem}
\\usepackage{fontawesome5}
\\usepackage{amsmath}
\\usepackage[
    pdftitle={${personalInfo.fullName}'s CV},
    pdfauthor={${personalInfo.fullName}},
    pdfcreator={LaTeX with CV Editor},
    colorlinks=true,
    urlcolor=primaryColor
]{hyperref}
\\usepackage[pscoord]{eso-pic}
\\usepackage{calc}
\\usepackage{bookmark}
\\usepackage{lastpage}
\\usepackage{changepage}
\\usepackage{paracol}
\\usepackage{ifthen}
\\usepackage{needspace}
\\usepackage{iftex}

% Settings and commands
\\ifPDFTeX
    \\input{glyphtounicode}
    \\pdfgentounicode=1
    \\usepackage[utf8]{inputenc}
    \\usepackage{lmodern}
\\fi

\\AtBeginEnvironment{adjustwidth}{\\partopsep0pt}
\\pagestyle{empty}
\\setcounter{secnumdepth}{0}
\\setlength{\\parindent}{0pt}
\\setlength{\\topskip}{0pt}
\\setlength{\\columnsep}{${styleSettings.columnSpacing}cm}

\\makeatletter
\\let\\ps@customFooterStyle\\ps@plain
\\patchcmd{\\ps@customFooterStyle}{\\thepage}{
    \\color{gray}\\textit{\\small ${styleSettings.footerText || personalInfo.fullName} - Page \\thepage{} of \\pageref*{LastPage}}
}{}{} 
\\makeatother
\\pagestyle{customFooterStyle}

\\titleformat{\\section}{\\needspace{4\\baselineskip}\\bfseries\\large}{}{0pt}{}[\\vspace{1pt}\\titlerule]

\\titlespacing{\\section}{
    -1pt
}{
    0.3 cm
}{
    0.2 cm
}

\\renewcommand\\labelitemi{$\\circ$}
\\newenvironment{highlights}{
    \\begin{itemize}[
        topsep=0.10 cm,
        parsep=0.10 cm,
        partopsep=0pt,
        itemsep=0pt,
        leftmargin=${styleSettings.bulletLeftMargin} cm + 10pt
    ]
}{
    \\end{itemize}
}

\\newenvironment{onecolentry}{
    \\begin{adjustwidth}{
        0.2 cm + 0.00001 cm
    }{
        0.2 cm + 0.00001 cm
    }
}{
    \\end{adjustwidth}
}

\\newenvironment{twocolentry}[2][]{
    \\onecolentry
    \\def\\secondColumn{#2}
    \\setcolumnwidth{\\fill, 4.5 cm}
    \\begin{paracol}{2}
}{
    \\switchcolumn \\raggedleft \\secondColumn
    \\end{paracol}
    \\endonecolentry
}

\\newenvironment{header}{
    \\setlength{\\topsep}{0pt}\\par\\kern\\topsep\\centering\\linespread{1.5}
}{
    \\par\\kern\\topsep
}

\\newcommand{\\placelastupdatedtext}{%
  \\AddToShipoutPictureFG*{%
    \\put(
        \\LenToUnit{\\paperwidth-2 cm-0.2 cm+0.05cm},
        \\LenToUnit{\\paperheight-1.0 cm}
    ){\\vtop{{\\null}\\makebox[0pt][c]{
        \\small\\color{gray}\\textit{Last updated in ${personalInfo.lastUpdated ? formatDate(personalInfo.lastUpdated) : 'September 2024'}}\\hspace{\\widthof{Last updated in ${personalInfo.lastUpdated ? formatDate(personalInfo.lastUpdatedTested) : 'September 2024'}}}
    }}}%
  }%
}%

\\let\\hrefWithoutArrow\\href
\\renewcommand{\\href}[2]{\\hrefWithoutArrow{#1}{\\ifthenelse{\\equal{#2}}{}{#2 }\\raisebox{.15ex}{\\footnotesize \\faExternalLink*}}}

\\newcommand{\\mysection}[5][true]{%
  \\needspace{4\\baselineskip}%
  \\vspace{#3} % top spacing
  \\textbf{\\fontsize{14pt}{16pt}\\selectfont #2}\\par % section title with forced line break
  \\ifthenelse{\\equal{#1}{true}}{%
    \\vspace{#4}% spacing between title and line
    \\noindent\\titlerule
  }{}%
  \\vspace{#5}% spacing after line
}

\\begin{document}
    \\newcommand{\\AND}{\\unskip
        \\cleaders\\copy\\ANDbox\\hskip\\wd\\ANDbox
        \\ignorespaces
    }
    \\newsavebox\\ANDbox
    \\sbox\\ANDbox{}

    \\placelastupdatedtext
    \\begin{header}
        \\textbf{\\fontsize{24 pt}{24 pt}\\selectfont ${personalInfo.fullName || 'Your Name'}}

        \\vspace{0.3 cm}

        \\normalsize
        ${personalInfo.location ? `\\mbox{{\\color{black}\\footnotesize\\faMapMarker*}\\hspace*{0.13cm}${personalInfo.location}}%` : ''}
        ${personalInfo.email ? `${personalInfo.location ? '\\kern 0.25 cm%\\AND%\\kern 0.25 cm%' : ''}\\mbox{\\hrefWithoutArrow{mailto:${personalInfo.email}}{\\color{black}{\\footnotesize\\faEnvelope[regular]}\\hspace*{0.13cm}${personalInfo.email}}}%` : ''}
        ${personalInfo.phone ? `${(personalInfo.location || personalInfo.email) ? '\\kern 0.25 cm%\\AND%\\kern 0.25 cm%' : ''}\\mbox{\\hrefWithoutArrow{tel:${personalInfo.phone}}{\\color{black}{\\footnotesize\\faPhone*}\\hspace*{0.13cm}${personalInfo.phone}}}%` : ''}
        ${personalInfo.website ? `${(personalInfo.location || personalInfo.email || personalInfo.phone) ? '\\kern 0.25 cm%\\AND%\\kern 0.25 cm%' : ''}\\mbox{\\hrefWithoutArrow{${personalInfo.website}}{\\color{black}{\\footnotesize\\faLink}\\hspace*{0.13cm}${personalInfo.website}}}%` : ''}
        ${personalInfo.linkedin ? `${(personalInfo.location || personalInfo.email || personalInfo.phone || personalInfo.website) ? '\\kern 0.25 cm%\\AND%\\kern 0.25 cm%' : ''}\\mbox{\\hrefWithoutArrow{${personalInfo.linkedin}}{\\color{black}{\\footnotesize\\faLinkedinIn}\\hspace*{0.13cm}${personalInfo.linkedin}}}%` : ''}
        ${personalInfo.github ? `${(personalInfo.location || personalInfo.email || personalInfo.phone || personalInfo.website || personalInfo.linkedin) ? '\\kern 0.25 cm%\\AND%\\kern 0.25 cm%' : ''}\\mbox{\\hrefWithoutArrow{${personalInfo.github}}{\\color{black}{\\footnotesize\\faGithub}\\hspace*{0.13cm}${personalInfo.github}}}%` : ''}
    \\end{header}

    \\vspace{0.3 cm - 0.3 cm}

${sortedSections.map(section => generateSectionContent(section)).filter(content => content.trim()).join('\n\n')}

\\end{document}`;
};
