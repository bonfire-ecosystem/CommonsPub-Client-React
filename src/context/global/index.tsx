import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ProvideActionCtx } from './actionCtx';
import { ProvideAlgoliaContext } from './algolia';
import { ProvideLocalizationCtx } from './localizationCtx';
import { ProvideStateCtx } from './stateCtx';
import { ProvideStoreCtx, StoreContextT } from './storeCtx';

interface Props {
  children: React.ReactNode;
  store: StoreContextT;
}
export const ProvideContexts: React.FC<Props> = ({ children, store }) => {
  return (
    <ProvideStoreCtx store={store}>
      <ProvideStateCtx>
        <ProvideActionCtx>
          <ProvideLocalizationCtx>
            <BrowserRouter>
              <ProvideAlgoliaContext>{children}</ProvideAlgoliaContext>
            </BrowserRouter>
          </ProvideLocalizationCtx>
        </ProvideActionCtx>
      </ProvideStateCtx>
    </ProvideStoreCtx>
  );
};
