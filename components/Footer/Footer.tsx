import React, { FunctionComponent } from 'react';
import { Footer as FooterData } from '../DefaultLayout';

type FooterProps = Partial<FooterData>;

const Footer: FunctionComponent<FooterProps> = (props) => {
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <footer role="contentinfo" className="footer">
      <div className="row">
        <div className="l-footer">
          <div className="l-footer__col">
            Newsletter Goes Here
          </div>
          Footer Sections Go Here
        </div>
        <div className="footer__meta">
          <div
            className="footer__meta-copy footer__meta-copy--major"
            dangerouslySetInnerHTML={ createMarkup(props.footer_text_major || '') }
          />
          <div
            className="footer__meta-copy"
            dangerouslySetInnerHTML={ createMarkup(props.footer_text || '') }
          />
        </div>
      </div>
    </footer>
  );
};

export { Footer };
