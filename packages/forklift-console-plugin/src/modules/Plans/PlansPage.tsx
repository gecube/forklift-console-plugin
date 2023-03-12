import React, { useState } from 'react';
import * as C from 'src/utils/constants';
import { PLAN_STATUS_FILTER } from 'src/utils/enums';
import { useTranslation } from 'src/utils/i18n';
import { groupVersionKindForReference } from 'src/utils/resources';
import { ResourceConsolePageProps } from 'src/utils/types';

import { EnumToTuple } from '@kubev2v/common/components/Filter/helpers';
import {
  loadUserSettings,
  StandardPage,
  UserSettings,
} from '@kubev2v/common/components/StandardPage';
import { ResourceFieldFactory } from '@kubev2v/common/components/types';
import { CreatePlanButton } from '@kubev2v/legacy/Plans/components/CreatePlanButton';

import { FlatPlan, useFlatPlans } from './data';
import PlanRow from './PlanRow';

export const fieldsMetadataFactory: ResourceFieldFactory = (t) => [
  {
    resourceFieldId: C.NAME,
    label: t('Name'),
    isVisible: true,
    isIdentity: true,
    filter: {
      type: 'freetext',
      placeholderLabel: t('Filter by name'),
    },
    sortable: true,
  },
  {
    resourceFieldId: C.NAMESPACE,
    label: t('Namespace'),
    isVisible: true,
    isIdentity: true,
    filter: {
      placeholderLabel: t('Filter by namespace'),
      type: 'freetext',
    },
    sortable: true,
  },
  {
    resourceFieldId: C.SOURCE,
    label: t('Source provider'),
    isVisible: true,
    filter: {
      type: 'freetext',
      placeholderLabel: t('Filter by name'),
    },
    sortable: true,
  },
  {
    resourceFieldId: C.TARGET,
    label: t('Target provider'),
    isVisible: true,
    filter: {
      type: 'freetext',
      placeholderLabel: t('Filter by name'),
    },
    sortable: true,
  },
  {
    resourceFieldId: C.VM_COUNT,
    label: t('VMs'),
    isVisible: true,
    sortable: true,
  },
  {
    resourceFieldId: C.STATUS,
    label: t('Status'),
    isVisible: true,
    filter: {
      type: 'enum',
      primary: true,
      placeholderLabel: t('Status'),
      values: EnumToTuple(PLAN_STATUS_FILTER),
    },
    sortable: true,
  },

  {
    resourceFieldId: C.DESCRIPTION,
    label: t('Description'),
    isVisible: true,
  },
  {
    resourceFieldId: C.ACTIONS,
    label: '',
    isAction: true,
    isVisible: true,
    sortable: false,
  },
  {
    resourceFieldId: C.ARCHIVED,
    label: t('Archived'),
    isHidden: true,
    filter: {
      type: 'slider',
      standalone: true,
      placeholderLabel: t('Show archived'),
      defaultValues: ['false'],
    },
  },
];

export const PlansPage = ({ namespace, kind: reference }: ResourceConsolePageProps) => {
  const { t } = useTranslation();
  const [userSettings] = useState(() => loadUserSettings({ pageId: 'Plans' }));
  const dataSource = useFlatPlans({
    namespace,
    groupVersionKind: groupVersionKindForReference(reference),
  });

  return (
    <PageMemo
      dataSource={dataSource}
      namespace={namespace}
      title={t('Plans')}
      userSettings={userSettings}
    />
  );
};
PlansPage.displayName = 'PlansPage';

const Page = ({
  dataSource,
  namespace,
  title,
  userSettings,
}: {
  dataSource: [FlatPlan[], boolean, boolean];
  namespace: string;
  title: string;
  userSettings: UserSettings;
}) => {
  const { t } = useTranslation();

  return (
    <StandardPage<FlatPlan>
      addButton={<CreatePlanButton namespace={namespace} />}
      dataSource={dataSource}
      RowMapper={PlanRow}
      fieldsMetadata={fieldsMetadataFactory(t)}
      namespace={namespace}
      title={title}
      userSettings={userSettings}
    />
  );
};

const PageMemo = React.memo(Page);

export default PlansPage;
