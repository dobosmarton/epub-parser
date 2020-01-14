export interface ParseHTMLConfig {
    resolveSrc?: (src: string) => string;
    resolveHref?: (href: string) => string;
}
declare const parseHTML: (HTMLString: any, config?: ParseHTMLConfig) => HtmlNodeObject[];
export default parseHTML;
