/**
 * entry
 */
function main() {
  logseq.App.showMsg('❤️ Message from logseq-timestamp :)')
  // logseq.App.registerCommandShortcut: ((keybinding: SimpleCommandKeybinding, action: SimpleCommandCallback<any>) => void)
  logseq.App.registerCommandShortcut({ binding: 'alt+shift+d', mode: 'editing' }, () => {
    let { format } = logseq.settings;
    format = format || 'toLocaleString';
    let now = new Date();
    let timestampStr = now.toLocaleString()
    switch (format) {
      case 'toUTCString':
        timestampStr = now.toUTCString();
        break;
      case 'toISOString':
        timestampStr = now.toISOString();
        break;
      default:
        timestampStr = now.toLocaleString();
        break;
    }
    logseq.App.insertAtEditingCursor(timestampStr + ' ')
  })
}

// bootstrap
logseq.useSettingsSchema([{
  key: 'format',
  type: 'enum',
  title: 'Time Format',
  description: 'select format of timestamp string',
  default: 'toLocaleString',
  enumChoices: ['toLocaleString', 'toUTCString', 'toISOString'],
  enumPicker: 'select'
}]).ready(main).catch(console.error)