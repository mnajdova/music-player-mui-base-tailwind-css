import * as React from 'react';
import Button from '@mui/base/ButtonUnstyled';
import MenuUnstyled, { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import MenuItemUnstyled, {
  MenuItemUnstyledProps
} from '@mui/base/MenuItemUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';

const MenuItem = React.forwardRef(function MenuItem(props: MenuItemUnstyledProps, ref: React.ForwardedRef<HTMLLIElement>) {
  return <MenuItemUnstyled {...props} componentsProps={{
    root: { className: 'block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' }
  }} ref={ref} />
})

const PlayerMenu = React.forwardRef(function PlayerMenu(props: { className?: string }, ref: React.ForwardedRef<HTMLDivElement>) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuActions = React.useRef<MenuUnstyledActions>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      if (event.key === 'ArrowUp') {
        menuActions.current?.highlightLastItem();
      }
    }
  };

  const close = () => {
    setAnchorEl(null);
    buttonRef.current!.focus();
  };

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
      close();
    };
  };

  return (
    <div {...props} ref={ref}>
      <Button
        type="button"
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
        ref={buttonRef}
        aria-controls={isOpen ? 'player-menu' : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="menu"
        className="text-slate-500 dark:text-slate-200 "
      >
        <svg width="24" height="24" version="1.1" x="0px" y="0px" viewBox="0 0 32.055 32.055">
          <g>
            <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
              C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
              s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
              c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z" stroke="currentColor" fill="currentColor"/>
          </g>
        </svg>
      </Button>

      <MenuUnstyled
        actions={menuActions}
        open={isOpen}
        onClose={close}
        anchorEl={anchorEl}
        components={{ Root: PopperUnstyled }}
        componentsProps={{ root: { className: 'z-10 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700' }, listbox: { id: 'player-menu' } }}
      >
        <MenuItem onClick={createHandleMenuClick('Profile')}>
          Profile
        </MenuItem>
        <MenuItem onClick={createHandleMenuClick('My account')}>
          My account
        </MenuItem>
        <MenuItem onClick={createHandleMenuClick('Log out')}>
          Log out
        </MenuItem>
      </MenuUnstyled>
    </div>
  );
});

export default PlayerMenu;
