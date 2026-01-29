export const defaultMessages = {
  common: {
    password: {
      id: 'common.password',
      defaultMessage: 'Password',
      description: 'Title for password input fields',
    },
    passwordEnterPlaceholder: {
      id: 'common.passwordEnterPlaceholder',
      defaultMessage: 'Enter your current password',
      description: 'Placeholder for current password input fields',
    },
    passwordReadableIcon: {
      id: 'common.passwordReadableIcon',
      defaultMessage: 'Set password readable',
      description: 'Label for setting password readable option',
    },
    passwordUnreadableIcon: {
      id: 'common.passwordUnreadableIcon',
      defaultMessage: 'Set password unreadable',
      description: 'Label for setting password unreadable option',
    },
    passwordFormError: {
      id: 'common.passwordFormError',
      defaultMessage:
        '{element} needs to be between {minLength} and {maxLength} characters long and contains at least a lower and upper case letter and a number',
      description: 'Error message for wrong form password value',
    },
    passwordCheckError: {
      id: 'common.passwordCheckError',
      defaultMessage: 'Password is not correct',
      description: 'Error message for invalid password value',
    },
    passwordMatchError: {
      id: 'common.passwordMatchError',
      defaultMessage: 'New passwords do not match',
      description: 'Error message for mismatched new passwords',
    },
    inputLengthText: {
      id: 'common.inputLengthText',
      defaultMessage: '{minLength} - {maxLength} characters',
      description: 'Placeholder for min-max length input fields',
    },
    inputLengthError: {
      id: 'common.inputLengthError',
      defaultMessage:
        '{element} needs to be between {minLength} and {maxLength} characters long',
      description: 'Error message for invalid input length',
    },
    cancelButton: {
      id: 'common.cancelButton',
      defaultMessage: 'Cancel',
      description: 'Text for cancel button',
    },
    jumpTop: {
      id: 'common.jumpTop',
      defaultMessage: 'Jump top',
      description: 'Text for jump top button',
    },
    loading: {
      id: 'common.loading',
      defaultMessage: 'Loading...',
      description: 'Text for loading indicator',
    },
  },
  header: {
    logoTitle: {
      id: 'header.logoTitle',
      defaultMessage: 'Secret Storage',
      description: 'Title for the header logo',
    },
    menuList: {
      id: 'header.menuList',
      defaultMessage: 'Data list',
      description: 'Text for menu element list',
    },
    menuChangePassword: {
      id: 'header.menuChangePassword',
      defaultMessage: 'Change password',
      description: 'Text for menu element change password',
    },
    menuExportData: {
      id: 'header.menuExportData',
      defaultMessage: 'Export data',
      description: 'Text for menu element export data',
    },
    menuLogOut: {
      id: 'header.menuLogOut',
      defaultMessage: 'Log out',
      description: 'Text for menu element log out',
    },
    menuLogIn: {
      id: 'header.menuLogIn',
      defaultMessage: 'Log in',
      description: 'Text for menu element log in',
    },
    logOutConfirmTitle: {
      id: 'header.logOutConfirmTitle',
      defaultMessage:
        'You have changed data in the list and it has not been exported. Are you sure to continue to log out without exporting your data?',
      description:
        'Confirmation message if non-exported data exists when logging out',
    },
    logOutConfirmOk: {
      id: 'header.logOutConfirmOk',
      defaultMessage: 'Continue',
      description:
        'Confirm popup ok button if non-exported data exists when logging out',
    },
  },
  footer: {
    designedBy: {
      id: 'footer.designedBy',
      defaultMessage: 'Designed by Kazoli.',
      description: 'Text in the footer about the designer',
    },
  },
  login: {
    documentTitle: {
      id: 'login.documentTitle',
      defaultMessage: 'Secret storage - Log in',
      description: 'Document title or login page',
    },
    fileSelectorTitle: {
      id: 'login.fileSelectorTitle',
      defaultMessage: 'Storage file type',
      description: 'Title to file selector block',
    },
    fileNewSelected: {
      id: 'login.fileNewSelected',
      defaultMessage: 'New file',
      description: 'Text to show new file as selected',
    },
    fileResetButton: {
      id: 'login.fileResetButton',
      defaultMessage: 'Reset to new file',
      description: 'Button to Reset to new file',
    },
    fileSelectorButton: {
      id: 'login.fileSelectorButton',
      defaultMessage: 'Select a file',
      description: 'Title to file selector block',
    },
    fileErrorWrongStructure: {
      id: 'login.fileErrorWrongStructure',
      defaultMessage: 'Wrong structure of the file content',
      description: 'Error message when the selected file has wrong structure',
    },
    fileErrorParsing: {
      id: 'login.fileErrorParsing',
      defaultMessage: 'Selected file content cannot be parsed',
      description: 'Error message when the selected file cannot be parsed',
    },
    fileErrorWrongType: {
      id: 'login.fileErrorWrongType',
      defaultMessage: 'File has wrong type or no content',
      description:
        'Error message when the selected file has wrong content or type',
    },
    loginButton: {
      id: 'login.loginButton',
      defaultMessage: 'Log in',
      description: 'Submit button to log in',
    },
  },
  list: {
    documentTitle: {
      id: 'list.documentTitle',
      defaultMessage: 'Secret storage - List',
      description: 'Document title or list page',
    },
    searchPlaceholder: {
      id: 'list.searchPlaceholder',
      defaultMessage: 'Enter keywords to search',
      description: 'Text for search input placeholder in list',
    },
    searchTypeAll: {
      id: 'list.searchTypeAll',
      defaultMessage: 'Search in: all',
      description: 'Text for search type all in list',
    },
    searchTypeTitle: {
      id: 'list.searchTypeTitle',
      defaultMessage: 'Search in: title',
      description: 'Text for search type title in list',
    },
    searchTypeData: {
      id: 'list.searchTypeData',
      defaultMessage: 'Search in: data',
      description: 'Text for search type data in list',
    },
    clearSearchButton: {
      id: 'list.clearSearchButton',
      defaultMessage: 'Clear search input',
      description: 'Text for clear search button in list',
    },
    addNewItemButton: {
      id: 'list.addNewItemButton',
      defaultMessage: 'Add new item',
      description: 'Text for add new item button in list',
    },
    reorderListButton: {
      id: 'list.reorderButton',
      defaultMessage: 'Reorder list',
      description: 'Text for reorder list button in list',
    },
    resetListButton: {
      id: 'list.resetListButton',
      defaultMessage: 'Reset list',
      description: 'Text for reset list button in list',
    },
    categoryAll: {
      id: 'list.categoryAll',
      defaultMessage: 'All categories',
      description: 'Text for all categories in list',
    },
    categoryNone: {
      id: 'list.categoryNone',
      defaultMessage: 'Non-categorized',
      description: 'Text for no category in list',
    },
    orderSelectorTitle: {
      id: 'list.orderSelectorTitle',
      defaultMessage: 'List order',
      description: 'Text for order selector title in list',
    },
    orderDefault: {
      id: 'list.orderDefault',
      defaultMessage: 'Current order',
      description: 'Text for default order in list',
    },
    orderTitleAsc: {
      id: 'list.orderTitleAsc',
      defaultMessage: 'Title (A-Z)',
      description: 'Text for title ascending order in list',
    },
    orderTitleDesc: {
      id: 'list.orderTitleDesc',
      defaultMessage: 'Title (Z-A)',
      description: 'Text for title descending order in list',
    },
    orderCategoryAsc: {
      id: 'list.orderCategoryAsc',
      defaultMessage: 'Category (A-Z)',
      description: 'Text for category ascending order in list',
    },
    orderCategoryDesc: {
      id: 'list.orderCategoryDesc',
      defaultMessage: 'Category (Z-A)',
      description: 'Text for category descending order in list',
    },
    orderCategoryCustom: {
      id: 'list.orderCategoryCustom',
      defaultMessage: 'Category (my own order)',
      description: 'Text for custom category order in list',
    },
    orderComment: {
      id: 'list.orderComment',
      defaultMessage:
        'You need to export data to keep the new order. If you would like the category order primarily and the title order inside a category, then first reorder by title and next by category.',
      description: 'Text for order comment in list',
    },
    reorderButton: {
      id: 'list.reorderButton',
      defaultMessage: 'Reorder list',
      description: 'Text for reorder list button in list',
    },
    gridViewButton: {
      id: 'list.gridViewButton',
      defaultMessage: 'Grid view',
      description: 'Text for grid view button in list',
    },
    listViewButton: {
      id: 'list.listViewButton',
      defaultMessage: 'List view',
      description: 'Text for list view button in list',
    },
    repositionButton: {
      id: 'list.repositionButton',
      defaultMessage: 'Reposition',
      description: 'Text for reposition list element button title in list',
    },
    repositionCancelButton: {
      id: 'list.repositionCancelButton',
      defaultMessage: 'Cancel reposition',
      description:
        'Text for cancel reposition list element button title in list',
    },
    insertBeforeButton: {
      id: 'list.insertBeforeButton',
      defaultMessage: 'Insert before this',
      description: 'Text for insert before button title in list',
    },
    insertAfterButton: {
      id: 'list.insertAfterButton',
      defaultMessage: 'Insert after this',
      description: 'Text for insert after button title in list',
    },
    emptyList: {
      id: 'list.emptyList',
      defaultMessage: 'No data can be found',
      description: 'Message when no data blocks can be found in the list',
    },
    itemTitle: {
      id: 'list.itemTitle',
      defaultMessage: 'Title',
      description: 'Title for item block in list page',
    },
    itemCategory: {
      id: 'list.itemCategory',
      defaultMessage: 'Category',
      description: 'Category for item block in list page',
    },
    itemCategoryPlaceholder: {
      id: 'list.itemCategoryPlaceholder',
      defaultMessage: 'Empty or up to {maxLength} characters length',
      description: 'Placeholder for category input for item block in list page',
    },
    itemDataShowButton: {
      id: 'list.itemDataShowButton',
      defaultMessage: 'Show data',
      description: 'Button to show data in list page',
    },
    itemDataHideButton: {
      id: 'list.itemDataHideButton',
      defaultMessage: 'Hide data',
      description: 'Button to hide data in list page',
    },
    itemDataEditButton: {
      id: 'list.itemDataEditButton',
      defaultMessage: 'Edit data',
      description: 'Button to edit data in list page',
    },
    itemDataDeleteButton: {
      id: 'list.itemDataDeleteButton',
      defaultMessage: 'Delete data',
      description: 'Button to delete data in list page',
    },
    itemData: {
      id: 'list.itemData',
      defaultMessage: 'Data',
      description: 'Data for item block in list page',
    },
    itemMissingTitle: {
      id: 'list.itemMissingTitle',
      defaultMessage: 'Missing title',
      description: 'Default title for missing titles in list items',
    },
    saveDataButton: {
      id: 'list.saveDataButton',
      defaultMessage: 'Save data',
      description: 'Text for save data button in list items',
    },
    hiddenDataWarning: {
      id: 'list.hiddenDataWarning',
      defaultMessage:
        'This data block may not appear in list after saving data because some list filters are in effect.',
      description:
        'Warning message when saved data may not appear in list due to active filters',
    },
    removeCategoryFilterLink: {
      id: 'list.removeCategoryFilterLink',
      defaultMessage: 'Clear category filter',
      description: 'Text for clear category filter link in list',
    },
    categoryFilterLink: {
      id: 'list.categoryFilterLink',
      defaultMessage: 'Filter to "{category}" category',
      description: 'Text for clear category filter link in list',
    },
    deleteDataConfirmTitle: {
      id: 'list.deleteDataConfirmTitle',
      defaultMessage: 'Enter your password to delete "{title}" block.',
      description: 'Text for delete data button in list items',
    },
    deleteDataConfirmOk: {
      id: 'list.deleteDataConfirmOk',
      defaultMessage: 'Delete',
      description: 'Text for delete data button in list items',
    },
    exportDataButton: {
      id: 'list.exportDataButton',
      defaultMessage: 'Export data',
      description: 'Text for export data button',
    },
    exportDataConfirmTitle: {
      id: 'list.exportDataConfirmTitle',
      defaultMessage:
        'Enter your password to encode and export all data into a file.',
      description: 'Text for export data confirm message',
    },
    exportDataConfirmOk: {
      id: 'list.exportDataConfirmOk',
      defaultMessage: 'Export data into file',
      description: 'Text for export data confirm ok button',
    },
    exportDataError: {
      id: 'list.exportDataError',
      defaultMessage: 'Encryption failed, please try to export again',
      description: 'Error message when data encryption fails during export',
    },
  },
  notFound: {
    documentTitle: {
      id: 'notFound.documentTitle',
      defaultMessage: '404 - Not found',
      description: 'Document title for 404 not found page',
    },
    mainTitle: {
      id: 'notFound.mainTitle',
      defaultMessage: 'Requested page cannot be found!',
      description: 'Main title for 404 not found page',
    },
    goBackLink: {
      id: 'notFound.goBackLink',
      defaultMessage: 'Go back to main page',
      description: 'Link text to go back to main page',
    },
  },
  changePassword: {
    documentTitle: {
      id: 'changePassword.documentTitle',
      defaultMessage: 'Secret storage - Change password',
      description: 'Document title for change password page',
    },
    newPassword: {
      id: 'changePassword.newPassword',
      defaultMessage: 'New password',
      description: 'Label for new password input',
    },
    newPasswordAgain: {
      id: 'changePassword.newPasswordAgain',
      defaultMessage: 'New password again',
      description: 'Label for new password again input',
    },
    currentPassword: {
      id: 'changePassword.currentPassword',
      defaultMessage: 'Current password',
      description: 'Label for current password input',
    },
    changePasswordButton: {
      id: 'changePassword.changePasswordButton',
      defaultMessage: 'Change password',
      description: 'Text for change password button',
    },
  },
};
