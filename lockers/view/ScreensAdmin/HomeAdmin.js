import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const HomeAdmin = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiKey = 'AIzaSyBXkF7g6m78JzilXlBPSn3zVW7VXKbWg-0';
        const channelId = 'UCKdVbvNXaf4uxQRHf73sQJg';
        const maxResults = 5;
        const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;
        
        const response = await fetch(url);
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const renderVideoItem = ({ item }) => {
    const videoId = item.id.videoId;
    const thumbnailUrl = item.snippet.thumbnails.medium.url;
    const title = item.snippet.title;
    const description = item.snippet.description.substring(0, 70) + '...';
    const publishedAt = item.snippet.publishedAt.substring(0, 10);

    const openVideo = () => {
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      Linking.openURL(videoUrl);
    };

    return (
      <TouchableOpacity style={styles.videoContainer} onPress={openVideo}>
        <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.publishedAt}>Publicado {publishedAt}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item, index) => index.toString()} // Utiliza el índice como clave única
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    padding: 10,
  },
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
  },
  thumbnail: {
    width: 120,
    height: 90,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  publishedAt: {
    fontSize: 12,
    color: 'gray',
  },
});

export default HomeAdmin;
