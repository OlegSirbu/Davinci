import React from 'react';
import AppBar from 'material-ui/AppBar';

const Header = () => {
  return (
    <AppBar
      style={{margin: 'auto 0'}}
      showMenuIconButton={false}
      title={'Davinci test'}
    />
  );
};

export default Header;
