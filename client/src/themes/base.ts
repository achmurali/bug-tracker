import normal from './normal';
import dark from './dark';
import { Theme } from '@material-ui/core';

export default function getTheme(theme:string) : Theme {
  return theme === 'normal' ? normal() : dark();
}