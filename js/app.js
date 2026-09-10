const loadAllLessons = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/levels/all');
    const data = await res.json();
    const allLessons = data.data
    displayLessons(allLessons)

}


const displayLessons = (allLessons) => {
    const lessionContainer = document.getElementById('lession-container')
    for (const lesson of allLessons) {
        console.log(lesson)
        const div = document.createElement('div')

        div.innerHTML = `
         <button id="lesson-btn-${lesson.level_no}" onclick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                                     <i class="fa-solid fa-book-open"></i> Lesson- ${lesson.level_no}</button>
       
       `

        lessionContainer.append(div)
    }
}


const removeActive = () => {
    const allLessonBtn = document.querySelectorAll('.lesson-btn')
    for (const button of allLessonBtn) {
        button.classList.remove('active')
    }
}

const loadWords = (id) => {

    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url).then(res => res.json()).then(data => {
        const lessonBtn = document.getElementById(`lesson-btn-${id}`)
        removeActive()
        lessonBtn.classList.add('active')
        displayWords(data.data)
    })
}

const loadWordDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json()
    displayWordDetailsInModal(details)
}

const displayWordDetailsInModal = details => {
    console.log(details)

// 
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = `
    
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <div>
                        <h3 class="text-2xl font-bold">${details.data.word}</h3>
                       <div class="my-3">
                         <p class="font-semibold">Meaning</p>
                        <p>${details.data.meaning}</p>
                       </div>
                       <div class="mb-3">
                         <p class="font-semibold">${details.data.sentence}</p>
                        <p>The kids were eager to open their gifts.</p>
                       </div>
                       <div class="mb-3">
                         <p class="font-semibold">সমার্থক শব্দ গুলো</p>
                       
                       </div>
                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
    
    `

    my_modal_5.showModal()
}

const displayWords = words => {
    const wordsContainer = document.getElementById('words-container')



    wordsContainer.innerHTML = ''
    if (words.length === 0) {
        wordsContainer.innerHTML = `
        
        <div class="text-center col-span-full font-bangla">
                    <img src="./assets/alert-error.png" alt="" class="flex justify-center mx-auto">
                    <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h3 class="text-3xl mt-3">নেক্সট Lesson এ যান</h3>
                  </div>
        
        `


        console.log(wordsContainer)
        return


    }
    words.forEach(word => {

        const div = document.createElement('div')

        div.innerHTML = `
        
         <div class="bg-white p-8 text-center space-y-3 rounded-md">
                        <h4 class="text-xl font-semibold">${word.word ? word.word : 'kichu nai'}</h4>
                        <p>Meaning /Pronounciation</p>
                        <h4 class="font-bangla text-xl font-semibold">"${word.meaning ? word.meaning : 'কোনো তথ্য পাওয়া যায়নি'} / ${word.pronunciation ? word.pronunciation : 'কোনো তথ্য পাওয়া যায়নি'}"</h4>

                        <div class="flex justify-between items-center">
                            <button onclick="loadWordDetails(${word.id})" class="bg-blue-200 hover:bg-blue-700 hover:text-white p-2 rounded cursor-pointer"><i
                                    class="fa-solid fa-circle-info"></i></button>
                            <button class="bg-blue-200 hover:bg-blue-700 hover:text-white p-2 rounded cursor-pointer"><i
                                    class="fa-solid fa-volume"></i></button>
                        </div>
                    </div>
        
        `

        wordsContainer.appendChild(div)


    })

}

// my_modal_5.showModal()

loadAllLessons()
