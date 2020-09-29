import { IRuntimeEnvVars } from './types';

export const APP_TITLE = 'Migration Toolkit for Virtualization';

export const CLOUD_MA_LINK = {
  href: '#', // TODO
  label: 'cloud.redhat.com',
};

export enum ProviderType {
  vsphere = 'vsphere',
  openshift = 'openshift',
}

export enum PlanStatusConditionsType {
  Ready = 'Ready',
  Running = 'Running',
  Finished = 'Finished',
  Error = 'Error',
}

export enum PlanStatusType {
  Ready = 'Ready',
  Running = 'Running',
  Finished = 'Complete',
  Error = 'Failed',
}

export const PROVIDER_TYPE_NAMES = {
  [ProviderType.vsphere]: 'VMware',
  [ProviderType.openshift]: 'OpenShift Virtualization',
};

export const SOURCE_PROVIDER_TYPES = [ProviderType.vsphere];
export const TARGET_PROVIDER_TYPES = [ProviderType.openshift];

export const RUNTIME_ENV: IRuntimeEnvVars = window['_env'];
