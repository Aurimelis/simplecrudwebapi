$(function () {
    var r = new RandomUsers();

    $("#generate-btn")
        .click(function () {
            var users = r.generateRandomUsers($("#counter").val());

            $("#users-table").empty();

            var table = r.generateTable(users);

            $('#users-table').append(table);
            $("#filter-duplicates").show();
        });

    $("#filter-duplicates")
        .click(function () {

            var $table = $("#users-table");

            var jsonRows = r.parseTableToJson($table);

            $.ajax({
                type: 'POST',
                url: "/api/randomUsers",
                data: jsonRows,
                contentType: 'application/json',
                dataType: "json",
                success: function (data) {
                    $("#users-table").empty();
                    $("#graph").empty();

                    var groupedTable = r.generateGroupedTable(data);
                    $('#users-table').append(groupedTable);

                    var graphData = [];
                    for (var city in data) {
                        if (data.hasOwnProperty(city)) {
                            var obj = {};
                            for (var prop in data[city]) {
                                if (data[city].hasOwnProperty(prop)) {
                                    if ($.isArray(data[city][prop])) {
                                        obj.population = data[city][prop].length;
                                    } else {
                                        obj.city = data[city][prop];
                                    }
                                }
                            }
                            graphData.push(obj);
                        }
                    }

                    var svg = d3.select("svg");

                    r.drawGraph(graphData, svg);

                    $("#filter-duplicates").hide();
                }
            });
        });
});