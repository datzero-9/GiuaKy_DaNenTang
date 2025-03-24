import React, { useState } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Share } from '@capacitor/share';
import { Geolocation } from '@capacitor/geolocation';
function TemperatureConverter() {
    const [celsius, setCelsius] = useState('');
    const [fahrenheit, setFahrenheit] = useState(null);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null);
    const convertToFahrenheit = () => {
        if (!celsius) {
            setError('Vui lòng nhập nhiệt độ (độ C).');
            return;
        }

        const celsiusValue = parseFloat(celsius);

        if (isNaN(celsiusValue)) {
            setError('Nhiệt độ (độ C) không hợp lệ.');
            return;
        }

        const fahrenheitValue = (celsiusValue * 9) / 5 + 32;
        setFahrenheit(fahrenheitValue.toFixed(2));
        setError(null);
        showNotification(fahrenheitValue.toFixed(2));
    };

    const showNotification = async (fahrenheit) => {
        try {
            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: 'Nhiệt độ (độ F)',
                        body: `Nhiệt độ (độ F) là: ${fahrenheit} °F`,
                        id: 1,
                        schedule: { at: new Date(Date.now() + 1000 * 5) },
                        actionTypeId: '',
                        extra: null,
                    },
                ],
            });
        } catch (error) {
            console.error('Lỗi khi hiển thị thông báo:', error);
        }
    };

    const shareTemperature = async (fahrenheit) => {
        try {
            await Share.share({
                title: 'Chia sẻ nhiệt độ (độ F)',
                text: `Nhiệt độ (độ F) là: ${fahrenheit} °F`,
                dialogTitle: 'Chia sẻ kết quả',
            });
        } catch (error) {
            console.error('Lỗi khi chia sẻ:', error);
        }
    };

    const getCurrentLocation = async () => {
        try {
            const coordinates = await Geolocation.getCurrentPosition();
            setLocation(coordinates);
            setError(null);
        } catch (error) {
            setError('Không thể lấy vị trí hiện tại.');
            console.error('Lỗi lấy vị trí:', error);
        }
    };
    return (
        <div className='m-2 p-1 flex justify-center'>
            <div className='border rounded-lg p-2'>
                <h2 className='text-[20px] font-bold text-center my-3 '>Chuyển đổi nhiệt độ C - F</h2>
                <div className='gap-2'>
                    {error && <p className='text-red-500'>{error}</p>}
                    <label className='font-bold text-[16px]'>Nhập (độ C):</label>
                    <input
                        className=' border-2 p-1 rounded-lg mx-2'
                        type="number"
                        value={celsius}
                        onChange={(e) => setCelsius(e.target.value)}
                    />

                </div>



                <div className=''>
                    <button onClick={getCurrentLocation} className=' p-1 rounded-lg mt-2 bg-yellow-200 font-medium'>Lấy vị trí hiện tại</button>
                    <button onClick={convertToFahrenheit} className=' p-1 rounded-lg mx-2 bg-blue-400 font-medium'>Chuyển đổi </button>
                </div>
                {location && (
                    <div className='mt-2'>
                        <hr className='mt-2'/>
                        <p>Vĩ độ: {location.coords.latitude}</p>
                        <p>Kinh độ: {location.coords.longitude}</p>
                    </div>
                )}
                {fahrenheit !== null && (
                    
                    <div>
                        <hr className='mt-2'/>
                        <p className='font-medium'>Nhiêt độ chuyển đổi: {fahrenheit} °F</p>
                        <button className=' p-2 bg-green-300 rounded-lg font-medium' onClick={() => shareTemperature(fahrenheit)}>Chia sẻ kết quả</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TemperatureConverter;