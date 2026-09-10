const pageFlip = new St.PageFlip(document.getElementById('book'), {
    width: 425,
    height: 530,
    minWidth: 425,
    maxWidth: 425,
    minHeight: 530,
    maxHeight: 530,
    showCover: true,
    maxShadowOpacity: 0.5,
    flippingTime: 700,
    useMouseEvents: true,
});

pageFlip.loadFromHTML(document.querySelectorAll('.page'));

pageFlip.on('flip', (e) => {
    const current = e.data;

    if (current > 0) {
        document.getElementById('book-positioner').classList.add('shift-right');
    } else {
        document.getElementById('book-positioner').classList.remove('shift-right');
    }
});