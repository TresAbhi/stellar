import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import * as RootContextListing from 'core/API/contextListings/types/root';

const contextMenuBenchmark: RootContextListing.contextMenuListing = {
  x: 0,
  y: 0,
  listing: [
    {
      type: 'text_button',
      onClick: () => alert('Woo! You clicked me!'),
      text: 'Click me',
    },
    {
      type: 'text_button',
      onClick: () => alert('Woo! You clicked me!'),
      text: 'Same thing as above, but with an icon',
      icon: EyeIcon,
    },
    {
      type: 'text_button',
      onClick: () => alert('Woo! You clicked me!'),
      text: 'Overflow text Overflow text Overflow text Overflow text',
    },
    {
      type: 'separator',
    },
    {
      type: 'text_button',
      onClick: () => alert('Woo! You clicked me!'),
      text: 'Click me',
    },
    {
      type: 'text_button',
      onClick: () => alert('Woo! You clicked me!'),
      text: 'Click me',
    },
    {
      type: 'extend_button',
      text: 'More options lol',
      extend: {
        x: 100,
        y: 100,
        listing: [
          {
            type: 'text_button',
            onClick: () => alert('Woo! You clicked me!'),
            text: 'Click me',
          },
          {
            type: 'text_button',
            onClick: () => alert('Woo! You clicked me!'),
            text: 'Same thing as above, but with an icon',
            icon: EyeIcon,
          },
        ],
      },
    },
  ],
};

export default contextMenuBenchmark;