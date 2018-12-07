export default () => {

    let w = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
    let h = window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
    window.commonMapHeight = (h) + "px";
    window.commonDatagridHeight = h;

    window.gpsInterval = null
}
