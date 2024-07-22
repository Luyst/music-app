import { useContext, useEffect, useState } from 'react';
import { StreamContext } from '~/context/Streaming';
import nct from 'nhaccuatui-api-full';

function StreamPlayList() {
    const { currentStream } = useContext(StreamContext);
    const [streamLyric, setStreamLyric] = useState('');

    useEffect(() => {
        if (!currentStream?.key) return; // Kiểm tra xem key có tồn tại không

        const fetchLyric = async (keySong) => {
            try {
                const lyric = await nct.getLyric(keySong);
                setStreamLyric(lyric.lyric.lyric || ''); // Đảm bảo rằng lyric không phải là undefined
            } catch (error) {
                console.error('Failed to fetch lyric:', error);
                setStreamLyric(''); // Xử lý lỗi và đảm bảo trạng thái có giá trị
            }
        };

        fetchLyric(currentStream.key);
    }, [currentStream.key]); // Thêm dependency array để gọi lại khi key thay đổi

    return (
        <div className="w-full">
            {streamLyric ? (
                <div
                    className="flex flex-col items-center text-center"
                    dangerouslySetInnerHTML={{ __html: streamLyric }}
                />
            ) : (
                <p>Loading lyrics...</p> // Hiển thị thông báo khi đang tải dữ liệu
            )}
        </div>
    );
}

export default StreamPlayList;
