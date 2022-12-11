const filterAppointmentId = (allAppointmentInfo, appointmentDate, appointmentTime) => {

    //filter appointments based on selected appointment date
    let filtered = JSON.parse(allAppointmentInfo).filter(allAppointment => {
        return ((new Date(allAppointment.appointmentDate).getTime() === new Date(appointmentDate).getTime())
            && (allAppointment.appointmentTime == appointmentTime));
    });

    return filtered[0];
}

const isLicenseNoDefault = (userInfo) => (userInfo.licenseNumber == "default" ? true : false);

module.exports = { filterAppointmentId, isLicenseNoDefault };
