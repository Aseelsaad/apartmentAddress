$(document).ready(function() {
    $.ajax({
        url: "https://api.myjson.com/bins/2sadq?pretty=1",
        dataType: "json",
        success: function (response) {
            $.each(response.apartments, function (i, apartment) {
               var apartmentClass = apartment.city.toLowerCase().replace(" ", "-");
                var listing=   "  <a href='#' id=" + apartment.id + " class='list-group-item " + apartmentClass + " listings'> <h4 class='list-group-item-heading'>" + apartment.description + " / " + apartment.bedrooms + " BR / " + apartment.price +"</h4> <p class='list-group-item-text'>"+ apartment.neighborhood+"</p> </a>";
               $(".apartments").append(listing);
            });
        },

        error: function (error) {
            console.log(error);
        }
    });

    $(".filter").click(function () {

        //To remove active class
        $(".filter").removeClass("active");

        //Add active class to selected filter
        $(this).addClass("active");

        //Show all before filtering
        $(".listings").show();

        //filtering based on the id to hide apartments that are from other cities
        var city = $(this).attr("id");
        if(city !== "all"){
            $(".listings").not("." + city).css("display", "none");

        }

    });

        $(document).on("click", ".listings", function() {
        var id = $(this).attr("id");
        $.ajax({
            url: "https://api.myjson.com/bins/2sadq?pretty=1",
            dataType: "json",
            success: function (response) {
            var selectedApartment = $.grep(response.apartments, function(apartment) {
               return apartment.id == id;

           })
               var address = selectedApartment[0].address ;

            //to open a new tab
                window.open("http://maps.google.com/?q=" + address);

            },

            error: function (error) {
                console.log(error);
            }
        });
    });
});


