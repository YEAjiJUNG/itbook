import Document, { DocumentContext } from 'next/document';
import styled, { ServerStyleSheet } from 'styled-components';
import { Main, NextScript, Head, Html } from 'next/document';

const themeInitializerScript = `(function(){
  const theme = localStorage.getItem("theme");
  if(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    return;
  };
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if(systemPrefersDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    return;
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
})()`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles} {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html >
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
};
