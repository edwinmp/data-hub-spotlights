import React, { FunctionComponent } from 'react';

interface SocialLinkProps {
  url?: string;
  socialSource: string;
}

const SocialLink: FunctionComponent<SocialLinkProps> = ({ url, socialSource }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img src={'/static/svg/source/' + socialSource + '.svg'} alt={socialSource} />
      <style jsx>{`
        img {
          float: left;
          margin: 0 5px;
          height: 3em;
          width: 3em;
        }
      `}</style>
    </a>
  );
};

export { SocialLink };
