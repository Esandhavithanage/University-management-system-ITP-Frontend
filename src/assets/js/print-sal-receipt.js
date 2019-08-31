function printR(id){
    console.log(id);
    var restorePage = document.body.innerHTML;
    var printcontent = document.getElementById(id).innerHTML;
    document.body.innerHTML = printcontent;
    window.print();
    document.body.innerHTML = restorePage;
}