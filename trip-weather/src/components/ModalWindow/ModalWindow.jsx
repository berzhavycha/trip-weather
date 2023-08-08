import React, { useRef, useState } from 'react'
import { availableCities } from '../../data'
import './ModalWindow.css'

const ModalWindow = ({ isOpen, closeWindow, addNewTrip }) => {
    const [formData, setFormData] = useState({
        city: '',
        startDate: '',
        endDate: ''
    })
    const [formError, setFormError] = useState({})
    const modalShellRef = useRef()


    const closeModalWindow = () => {
        modalShellRef.current.classList.add('zoomOut')
        setTimeout(() => {
            closeWindow()
        }, 300)
        setFormError({})
        setFormData({})
    }


    const validateForm = (formData) => {
        const errors = {}

        const startDate = new Date(formData.startDate)
        const endDate = new Date(formData.endDate)

        const todayDate = new Date()
        const maxDate = new Date()
        maxDate.setDate(todayDate.getDate() + 15)

        if (!formData.city) {
            errors.city = 'Please, select your city'
        }

        if (!formData.startDate) {
            errors.startDate = 'Please, select your start date'
        }

        if (startDate.getTime() > maxDate.getTime() || startDate.getTime() < todayDate.getTime()) {
            errors.startDate = 'The start date should be within the next 15 days'
        }

        if (!formData.endDate) {
            errors.endDate = 'Please, select your end date'
        }

        if (endDate.getTime() > maxDate.getTime() || endDate.getTime() < todayDate.getTime()) {
            errors.endDate = 'The end date should be within the next 15 days'
        }
        
        if (endDate.getTime() < startDate.getTime()) {
            errors.endDate = 'The end date can`t be less than the start date'
        }

        setFormError(errors)
        return errors
    }

    
    const changeDateFormat = (date) => {
        const splitDate = date.split('-')
        return `${splitDate[2]}.${splitDate[1]}.${splitDate[0]}`
    }


    const handleSubmit = e => {
        e.preventDefault()

        const errors = validateForm(formData)

        if (Object.keys(errors).length === 0) {
            const startDate = changeDateFormat(formData.startDate)
            const endDate = changeDateFormat(formData.endDate)

            addNewTrip(formData.city, startDate, endDate)
            setFormData({
                city: '',
                startDate: '',
                endDate: ''
            })
        }
    }


    return (
        <div ref={modalShellRef} className={`modal-window-shell ${isOpen && 'zoomIn'}`}>
            <div className="modal-window-inner">
                <div className="modal-window-top">
                    <h2>Create Trip</h2>
                    <button onClick={closeModalWindow}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <form
                    className='modal-form'
                    onSubmit={handleSubmit}
                    method='post'
                >
                    <div className="form-block">
                        <label htmlFor="city"><span className='red'>*</span> City</label>
                        <select
                            id='city'
                            name='city'
                            value={formData.city}
                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                            className={formError.city && 'error'}
                        >
                            <option value="" disabled selected hidden>Please select a city</option>
                            {availableCities.map((item) => {
                                return <option key={item.id} value={item.city}>{item.city}</option>
                            })}
                        </select>
                        {formError.city && <span className='error-message'>{formError.city}</span>}
                    </div>
                    <div className="form-block">
                        <label htmlFor="start-date"><span className='red'>*</span> Start date</label>
                        <div className="date-input">
                            <input
                                name='start-date'
                                id='from-date'
                                onFocus={e => e.target.type = 'date'}
                                type='text'
                                placeholder='Select date'
                                className={formError.startDate && 'error'}
                                value={formData.startDate}
                                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                            />
                            <div className="calendar-icon"><i className="fa-solid fa-calendar"></i></div>
                        </div>
                        {formError.startDate && <span className='error-message'>{formError.startDate}</span>}
                    </div>
                    <div className="form-block">
                        <label htmlFor="to-date"><span className='red'>*</span> End date</label>
                        <div className="date-input">
                            <input
                                name='end-date'
                                id='to-date'
                                onFocus={e => e.target.type = 'date'}
                                type='text'
                                placeholder='Select date'
                                className={formError.endDate && 'error'}
                                value={formData.endDate}
                                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                            />
                            <div className="calendar-icon"><i className="fa-solid fa-calendar"></i></div>
                        </div>
                        {formError.endDate && <span className='error-message'>{formError.endDate}</span>}
                    </div>
                    <div className="modal-window-bottom">
                        <button onClick={closeModalWindow} className="cancel" type='button'>Cancel</button>
                        <button type='submit' className="save">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalWindow
