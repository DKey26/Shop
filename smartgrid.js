const settings = {
  outputStyle: 'scss',
  /* less || scss || sass || styl */
  columns: 12,
  /* number of grid columns */
  offset: '80px',
  /* gutter width px || % || rem */
  mobileFirst: false,
  /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
    maxWidth: '1440px',
    /* max-width оn very large screen */
    fields: '80px' /* side fields */,
  },
  breakPoints: {
    lg: {
      width: '1100px',
      /* -> @media (max-width: 1100px) */
    },
    md: {
      width: '992px',
    },
    sm: {
      width: '767px',
      fields: '16px' /* set fields only if you want to change container.fields */,
    },
    xs: {
      width: '360px',
    },
    /* 
    We can create any quantity of break points.

    some_name: {
        width: 'Npx',
        fields: 'N(px|%|rem)',
        offset: 'N(px|%|rem)'
    }
    */
  },
}

module.exports = settings
