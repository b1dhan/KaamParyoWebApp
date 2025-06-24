     document.addEventListener('DOMContentLoaded', function() {
 
            const buttons = document.querySelectorAll('#new');
            const overlay = document.getElementById('loginOverlay');
            

            buttons.forEach(button => {
       
                if (!button.closest('.overlay')) {
                    button.addEventListener('click', function(e) {
                    
                        e.preventDefault();
                        
                     
                        overlay.style.display = 'flex';
                        document.body.classList.add('blurred');
                    });
                }
            });
        });

        let dateVal = document.querySelectorAll('.dat');
        
        dateVal.forEach(date => {
  date.addEventListener('click', function() {
    document.querySelectorAll('.dat').forEach(d => d.classList.remove('selected'));
    this.classList.add('selected');
  });
});

    const timeSlots = document.querySelectorAll('.time-slots button');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            timeSlots.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });