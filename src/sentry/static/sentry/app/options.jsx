import React from 'react';
import ConfigStore from './stores/configStore';
import {t} from './locale';
import {EmailField, TextField} from './components/forms';

const definitions = {
  'system.url-prefix': {
    label: t('Root URL'),
    placeholder: 'https://Loginsight.example.com',
    help: t('The root web address which is used to communicate with the Loginsight backend.'),
    defaultValue: () => `${document.location.protocol}//${document.location.host}`
  },
  'system.admin-email': {
    label: t('Admin Email'),
    placeholder: 'admin@example.com',
    help: t('The technical contact for this Loginsight installation.'),
    // TODO(dcramer): this shoudl not be hardcoded to a component
    component: EmailField,
    defaultValue: () => ConfigStore.get('user').email
  }
};

const disabledReasons = {
  diskPriority: 'This setting is defined in config.yml and may not be changed via the web UI.',
};

export function getOption(option) {
  return definitions[option];
}

export function getOptionField(option, onChange, value, field) {
  let meta = {...getOption(option), ...field};
  let Field = meta.component || TextField;
  return (
    <Field
        key={option}
        label={meta.label}
        defaultValue={meta.defaultValue()}
        placeholder={meta.placeholder}
        help={meta.help}
        onChange={onChange}
        required={meta.required}
        value={value}
        disabled={meta.disabled}
        disabledReason={meta.disabledReason && disabledReasons[meta.disabledReason]} />
  );
}

export default definitions;
