$(document).ready(() => {
    let selectedAppointmentTime = $("#appointmentTime").attr("value");

    const filterAppointmentTime = () => {
        let allAppointmentInfo = JSON.parse($("#allAppointmentInfo").val());
        let selectedAppointmentDate = $("#appointmentDate").val();

        //filter appointments based on selected appointment date
        let filteredAppointmentInfoByDate = allAppointmentInfo.filter(allAppointment =>
            (new Date(allAppointment.appointmentDate).getTime() == new Date(selectedAppointmentDate).getTime()));

        //clear existing appointment time dropdown list to eliminate duplicates
        $('#appointmentTime').empty();
        filteredAppointmentInfoByDate.forEach(appointmentInfo => {
            //append option value for appointment time
            $('#appointmentTime').append($('<option>', {
                value: appointmentInfo.appointmentTime,
                text: appointmentInfo.appointmentTime,
            }));
        })
    }

    const sortAppointmentTime = () => {
        const appointmentTimeOptions = $("#appointmentTime option");
        const currentDate = new Date().toISOString().split('T')[0];
        if (appointmentTimeOptions.length > 0) {
            let sorted = appointmentTimeOptions.sort((a, b) => new Date(`${currentDate} ${padDigit(a.text)}`) - new Date(`${currentDate} ${padDigit(b.text)}`));
            $("#appointmentTime").empty().append(sorted);
            $("#appointmentTime").attr("disabled", false);
        } else {
            $("#appointmentTime").attr("disabled", true); //disable appointment time option if the list is empty
        }
    }

    //fetch appointment info on application load
    filterAppointmentTime();

    //if the appointment time has been already saved, then show it as selected value and in dropdown list
    if (selectedAppointmentTime) {
        //append option value for appointment time
        $('#appointmentTime').append($('<option>', {
            value: selectedAppointmentTime,
            text: selectedAppointmentTime,
            selected: true
        }));
    }

    $("#appointmentDate").on("change", () => {
        filterAppointmentTime();
        sortAppointmentTime();
    });

    sortAppointmentTime();
});

