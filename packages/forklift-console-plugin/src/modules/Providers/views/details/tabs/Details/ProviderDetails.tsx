import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SectionHeading } from 'src/components/headers/SectionHeading';
import { useGetDeleteAndEditAccessReview, useProviderInventory } from 'src/modules/Providers/hooks';
import { ProviderData } from 'src/modules/Providers/utils';
import { useForkliftTranslation } from 'src/utils/i18n';

import {
  ProviderInventory,
  ProviderModel,
  ProviderModelGroupVersionKind,
  V1beta1Provider,
} from '@kubev2v/types';
import { useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';
import { PageSection } from '@patternfly/react-core';

import { ConditionsSection, DetailsSection, InventorySection } from '../../components';

interface ProviderDetailsProps extends RouteComponentProps {
  obj: ProviderData;
  ns?: string;
  name?: string;
  loaded?: boolean;
  loadError?: unknown;
}

export const ProviderDetails: React.FC<ProviderDetailsProps> = ({ obj, loaded, loadError }) => {
  const { t } = useForkliftTranslation();
  const { provider } = obj;

  if (!loaded || loadError || !provider?.metadata?.name) {
    return <></>;
  }

  return (
    <div>
      <PageSection>
        <SectionHeading text={t('Provider details')} />
        <DetailsSection data={obj} />
      </PageSection>

      <PageSection className="forklift-page-section">
        <SectionHeading text={t('Provider inventory')} />
        <InventorySection data={obj} />
      </PageSection>

      <PageSection className="forklift-page-section">
        <SectionHeading text={t('Conditions')} />
        <ConditionsSection conditions={provider?.status?.conditions} />
      </PageSection>
    </div>
  );
};

export const ProviderDetailsWrapper: React.FC<{ name: string; namespace: string }> = ({
  name,
  namespace,
}) => {
  const [provider, providerLoaded, providerLoadError] = useK8sWatchResource<V1beta1Provider>({
    groupVersionKind: ProviderModelGroupVersionKind,
    namespaced: true,
    name,
    namespace,
  });

  const { inventory } = useProviderInventory<ProviderInventory>({ provider });
  const permissions = useGetDeleteAndEditAccessReview({ model: ProviderModel, namespace });

  const data = { provider, inventory, permissions };

  return <ProviderDetails obj={data} loaded={providerLoaded} loadError={providerLoadError} />;
};
