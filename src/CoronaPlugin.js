import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import Prediagnosis from './components/Prediagnosis/Prediagnosis'
import reducers, { namespace } from './states';
import { CRM_URL } from './Constants'

const PLUGIN_NAME = 'CoronaPlugin';

export default class CoronaPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);
    const options = { sortOrder: -1 };
    flex.CRMContainer
      .Content
      .add(<Prediagnosis key="prediagnosis" />, options);

    flex.CRMContainer.defaultProps.uri = CRM_URL;
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
