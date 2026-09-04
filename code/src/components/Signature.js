import React from "react";
import { Footer } from "./styled/Footer";

export const Signature = () => {
  return (
    <Footer height={100} width={100}>
      <div className="contacts-wrapper">
        <p>
          created and developed by &#8203;
          <a className="link" href="https://snopok.io" target="_blank" rel="noopener noreferrer">
            @marysnopok
          </a>
        </p>
        <p>
          photos by &#8203;
          <a className="link" href="https://unsplash.com/@jessbaileydesigns" target="_blank" rel="noopener noreferrer">
            @jessbailey
          </a>
        </p>
      </div>
    </Footer>
  );
};
