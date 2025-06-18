
import { CVData, Entry, Publication } from '../types/cv';

export const generateLatexCode = (data: CVData): string => {
  const {
    personalInfo,
    sections,
    educationEntries,
    experienceEntries,
    projectEntries,
    publications,
    technologies,
    styleSettings,
    customSections,
    sectionEntries
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
        ${entry.location ? `\\textit{${entry.location}}` : ''}    
            ${entry.dateRange ? `\\textit{${entry.dateRange}}` : ''}
        }
            \\textbf{${entry.leftTitle}}
            ${entry.subtitle ? `\\textit{${entry.subtitle}}` : ''}
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
        \\end{samepage}`).join('\n\n');
  };

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
    \\color{gray}\\textit{\\small ${styleSettings.footerText} - Page \\thepage{} of \\pageref*{LastPage}}
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
        \\small\\color{gray}\\textit{Last updated in ${personalInfo.lastUpdated ? formatDate(personalInfo.lastUpdated) : 'September 2024'}}\\hspace{\\widthof{Last updated in ${personalInfo.lastUpdated ? formatDate(personalInfo.lastUpdated) : 'September 2024'}}}
    }}}%
  }%
}%

\\let\\hrefWithoutArrow\\href
\\renewcommand{\\href}[2]{\\hrefWithoutArrow{#1}{\\ifthenelse{\\equal{#2}}{}{#2 }\\raisebox{.15ex}{\\footnotesize \\faExternalLink*}}}

\\begin{document}
    \\newcommand{\\AND}{\\unskip
        \\cleaders\\copy\\ANDbox\\hskip\\wd\\ANDbox
        \\ignorespaces
    }
    \\newsavebox\\ANDbox
    \\sbox\\ANDbox{}

    \\placelastupdatedtext
    \\begin{header}
        \\textbf{\\fontsize{24 pt}{24 pt}\\selectfont ${personalInfo.fullName}}

        \\vspace{0.3 cm}

        \\normalsize
        \\mbox{{\\color{black}\\footnotesize\\faMapMarker*}\\hspace*{0.13cm}${personalInfo.location}}%
        \\kern 0.25 cm%
        \\AND%
        \\kern 0.25 cm%
        \\mbox{\\hrefWithoutArrow{mailto:${personalInfo.email}}{\\color{black}{\\footnotesize\\faEnvelope[regular]}\\hspace*{0.13cm}${personalInfo.email}}}%
        \\kern 0.25 cm%
        \\AND%
        \\kern 0.25 cm%
        \\mbox{\\hrefWithoutArrow{tel:${personalInfo.phone}}{\\color{black}{\\footnotesize\\faPhone*}\\hspace*{0.13cm}${personalInfo.phone}}}%
        \\kern 0.25 cm%
        \\AND%
        \\kern 0.25 cm%
        \\mbox{\\hrefWithoutArrow{${personalInfo.website}}{\\color{black}{\\footnotesize\\faLink}\\hspace*{0.13cm}${personalInfo.website}}}%
        \\kern 0.25 cm%
        \\AND%
        \\kern 0.25 cm%
        \\mbox{\\hrefWithoutArrow{${personalInfo.linkedin}}{\\color{black}{\\footnotesize\\faLinkedinIn}\\hspace*{0.13cm}${personalInfo.linkedin}}}%
        \\kern 0.25 cm%
        \\AND%
        \\kern 0.25 cm%
        \\mbox{\\hrefWithoutArrow{${personalInfo.github}}{\\color{black}{\\footnotesize\\faGithub}\\hspace*{0.13cm}${personalInfo.github}}}%
    \\end{header}

    \\vspace{0.3 cm - 0.3 cm}

${sections.education?.visible ? `
    \\section{${sections.education.title}}
    ${educationEntries.map(entry => generateEntry(entry)).join('\\n\\n        \\vspace{0.2 cm}\\n\\n')}
` : ''}

${sections.experience?.visible ? `
    \\section{${sections.experience.title}}
    ${experienceEntries.map(entry => generateEntry(entry)).join('\\n\\n        \\vspace{0.2 cm}\\n\\n')}
` : ''}

${sections.publications?.visible && publications.length > 0 ? `
    \\section{${sections.publications.title}}
    ${generatePublications(publications)}
` : ''}

${sections.projects?.visible ? `
    \\section{${sections.projects.title}}
    ${projectEntries.map(entry => generateEntry(entry)).join('\\n\\n        \\vspace{0.2 cm}\\n\\n')}
` : ''}

${sections.technologies?.visible ? `
    \\section{${sections.technologies.title}}
    ${technologies.programmingLanguages.length > 0 ? `
        \\begin{onecolentry}
            \\textbf{Languages:} ${technologies.programmingLanguages.join(', ')}
        \\end{onecolentry}` : ''}
    ${technologies.frameworks.length > 0 ? `
        \\vspace{0.2 cm}
        \\begin{onecolentry}
            \\textbf{Technologies:} ${technologies.frameworks.join(', ')}
        \\end{onecolentry}` : ''}
    ${technologies.tools.length > 0 ? `
        \\vspace{0.2 cm}
        \\begin{onecolentry}
            \\textbf{Tools:} ${technologies.tools.join(', ')}
        \\end{onecolentry}` : ''}
` : ''}

${customSections.map(sectionKey => {
  const section = sections[sectionKey];
  const entries = sectionEntries[sectionKey] || [];
  if (!section?.visible || entries.length === 0) return '';
  
  return `
    \\section{${section.title}}
    ${entries.map(entry => generateEntry(entry)).join('\\n\\n        \\vspace{0.2 cm}\\n\\n')}
  `;
}).join('')}

\\end{document}`;
};
