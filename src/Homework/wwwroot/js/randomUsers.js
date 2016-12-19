var RandomUsers = function () {
    this.firstNames = ['Lukas', 'Matas', 'Nojus', 'Dominykas', 'Jokubas'];
    this.lastNames = ['Lukauskas', 'Matauskas', 'Nojauskas', 'Dominykauskas', 'Jokubauskas'];
    this.addresses = ['Lukasu 12-13', 'Matauju 10-12', 'Nojuku 5-85', 'Dominu 6-4', 'Jokubu 1-4'];
    this.cities = ['Vilnius', 'Kaunas', 'Klaipeda', 'Siauliai', 'Panevezys'];
}

RandomUsers.prototype.generateRandomUsers = function (c) {

    var users = [];

    for (var i = 0; i < c; i++) {
        users.push({
            firstName: this.firstNames.random(),
            lastName: this.lastNames.random(),
            address: this.addresses.random(),
            postalcode: Math.floor(Math.random() * 90000) + 10000,
            city: this.cities.random()
        });
    }

    return users;
}

RandomUsers.prototype.generateTable = function (users) {
    var $theTable = document.createElement('table');

    var htr = document.createElement('tr');
    var tc = document.createElement('th');
    $(tc).addClass('first');
    tc.appendChild(document.createTextNode(''));
    htr.appendChild(tc);

    for (var p in users[0]) {
        if (users[0].hasOwnProperty(p)) {
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(p));
            htr.appendChild(th);
        }
    }
    $theTable.appendChild(htr);

    for (var i = 0, tr; i < users.length; i++) {
        tr = document.createElement('tr');
        var t = document.createElement('td');
        $(t).addClass('first');
        t.appendChild(document.createTextNode(i));
        tr.appendChild(t);
        for (var prop in users[i]) {
            if (users[i].hasOwnProperty(prop)) {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(users[i][prop]));
                tr.appendChild(td);
            }
        }
        $theTable.appendChild(tr);
    }

    return $theTable;
}

RandomUsers.prototype.parseTableToJson = function ($table) {
    var rows = [],
        header = [];

    $table.find("th:not(.first)")
        .each(function () {
            header.push($(this).html());
        });

    $table.find("tr")
        .each(function () {
            var row = {};

            $(this)
                .find("td:not(.first)")
                .each(function (i) {
                    var key = header[i],
                        value = $(this).html();

                    row[key] = value;
                });

            if (JSON.stringify(row) !== '{}') {
                rows.push(row);
            }
        });

    return JSON.stringify(rows);
}

RandomUsers.prototype.generateGroupedTable = function (users) {
    var $theTable = document.createElement('table');

    var htr = document.createElement('tr');
    var tc = document.createElement('th');
    $(tc).addClass('first');
    tc.appendChild(document.createTextNode(''));
    htr.appendChild(tc);

    for (var p in users[0]) {
        if (users[0].hasOwnProperty(p)) {
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(p));
            htr.appendChild(th);
        }
    }
    $theTable.appendChild(htr);

    for (var i = 0, tr; i < users.length; i++) {
        tr = document.createElement('tr');
        var t = document.createElement('td');
        $(t).addClass('first');
        t.appendChild(document.createTextNode(i));
        tr.appendChild(t);
        for (var prop in users[i]) {
            if (users[i].hasOwnProperty(prop)) {
                var td = document.createElement('td');
                if ($.isArray(users[i][prop])) {
                    var usersArray = users[i][prop];
                    for (var u in usersArray) {
                        if (usersArray.hasOwnProperty(u)) {
                            var tr2 = document.createElement('tr');
                            for (var j in usersArray[u]) {
                                if (usersArray[u].hasOwnProperty(j)) {
                                    var td2 = document.createElement('td');
                                    td2.appendChild(document.createTextNode(usersArray[u][j]));
                                    tr2.appendChild(td2);
                                }
                            }
                            td.appendChild(tr2);
                        }
                    }
                } else {
                    td.appendChild(document.createTextNode(users[i][prop]));
                }
                tr.appendChild(td);
            }
        }
        $theTable.appendChild(tr);
    }

    return $theTable;
}

RandomUsers.prototype.drawGraph = function (graphData, svg) {
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            return "<strong>Population:</strong> <span style='color:red'>" + d.population + "</span>";
        });

    svg.call(tip);


    x.domain(graphData.map(function (d) { return d.city; }));
    y.domain([0, d3.max(graphData, function (d) { return d.population; })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Population");

    g.selectAll(".bar")
        .data(graphData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.city); })
        .attr("y", function (d) { return y(d.population); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.population); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
}