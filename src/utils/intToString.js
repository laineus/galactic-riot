export default num =>  String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
