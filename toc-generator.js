window.onload = function () {
    var includeh1 = false;

    var pageContents = document.getElementById("page-contents");
    var headings = pageContents.querySelectorAll("h1,h2,h3,h4");

    var toclist = document.createElement("ol");

    var prevHeading = "";
    var prevSubList = 0;
    var prevDoubleSublist = 0;
    var prevTripleSublist = 0;

    for (i = 0; i <= headings.length - 1; i++) {
        var id = headings[i].textContent.toLowerCase().replace(/ /g, "-");
        var level = headings[i].localName.replace("h", "");
        var text = headings[i].textContent;

        if (includeh1 === false) {
            var _temp = Number(level);
            _temp--;
            level = _temp.toString();
        }

        headings[i].setAttribute("id", id);
        var listitem = document.createElement("li");
        var anchor = document.createElement("a");
        anchor.setAttribute("href", "#" + id);
        anchor.textContent = text;
        listitem.appendChild(anchor);

        if (level == 1) {
            toclist.appendChild(listitem);
            prevHeading = level;
        } else if (level == 2) {
            if (prevHeading == level) {
                document.getElementsByClassName("toc-sublist")[prevSubList - 1].appendChild(listitem);
            } else {
                var sublist = document.createElement("ul");
                prevSubList++;
                sublist.setAttribute("class", "toc-sublist");
                sublist.appendChild(listitem);
                toclist.appendChild(sublist);
            }
            prevHeading = level;
        } else if (level == 3) {
            if (prevHeading == level) {
                document.getElementsByClassName("toc-doublesublist")[prevDoubleSublist - 1].appendChild(listitem);
            } else {
                var doubleSubList = document.createElement("ul");
                prevDoubleSublist++;
                doubleSubList.setAttribute("class", "toc-doublesublist");
                doubleSubList.appendChild(listitem);
                document.getElementsByClassName("toc-sublist")[prevSubList - 1].appendChild(doubleSubList);
            }
            prevHeading = level;
        } else if (level == 4) {
            if (prevHeading == level) {
                document.getElementsByClassName("toc-triplesublist")[prevTripleSublist - 1].appendChild(listitem);
            } else {
                var tripleSublist = document.createElement("ul");
                prevTripleSublist++;
                tripleSublist.setAttribute("class", "toc-triplesublist");
                tripleSublist.appendChild(listitem);
                document.getElementsByClassName("toc-doublesublist")[prevSubList - 1].appendChild(tripleSublist);
            }
            prevHeading = level;
        }
        document.getElementById("toc").appendChild(toclist);
    }
}
