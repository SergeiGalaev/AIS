export default {
  items: [
    {
      name: 'Формы',
      url: '/base/forms',
      icon: 'icon-list',
    },
    {
      name: 'Справочники',
      url: '/enums',
      icon: 'icon-settings',
      children: [
        // {
        //   name: 'Роли пользователей',
        //   url: '/enums/roles',
        //   icon: 'icon-options',
        // },
        {
          name: 'Пользователи',
          url: '/users',
          icon: 'icon-user',
        },
      ],
    },
  ],
};