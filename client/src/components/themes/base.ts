import normal from './normal';
import dark from './dark';
import { Theme } from '@material-ui/core';

const themes:{ [key: string]: Theme } = {
  normal,
  dark,
}

export default function getTheme(theme:string) : Theme {
  return themes[theme]
}