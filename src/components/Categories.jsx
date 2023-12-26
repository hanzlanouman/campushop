const Categories = ({ items, onClickItem }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.value.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onClickItem(item)}
          >
            <Text style={styles.text}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
