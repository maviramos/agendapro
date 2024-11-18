document.addEventListener('DOMContentLoaded', function () {
  let calendarEl = document.getElementById('calendar');
  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    events: [],
    dateClick: function (info) {
      openModal();
      document.getElementById('eventDate').value = info.dateStr;
      document.getElementById('deleteButton').style.display = 'none';
      selectedEvent = null;
    },
    eventClick: function (info) {
      selectedEvent = info.event;
      document.getElementById('eventTitle').value = selectedEvent.title;
      document.getElementById('eventDate').value = selectedEvent.start.toISOString().split('T')[0];
      document.getElementById('deleteButton').style.display = 'inline';
      openModal();
    }
  });

  calendar.render();

  let modal = document.getElementById('eventModal');
  let span = document.getElementsByClassName('close')[0];
  let form = document.getElementById('eventForm');
  let selectedEvent = null;

  span.onclick = function () {
    closeModal();
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let title = document.getElementById('eventTitle').value;
    let date = document.getElementById('eventDate').value;

    if (selectedEvent) {
      selectedEvent.setProp('title', title);
      selectedEvent.setStart(date);
      selectedEvent = null;
    } else {
      calendar.addEvent({
        title: title,
        start: date,
        allDay: true
      });
    }
    closeModal();
  });

  document.getElementById('deleteButton').onclick = function () {
    if (selectedEvent) {
      selectedEvent.remove();
      selectedEvent = null;
      closeModal();
    }
  };

  function openModal() {
    modal.style.display = 'block';
  }

  function closeModal() {
    modal.style.display = 'none';
    form.reset();
  }
});