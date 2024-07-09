import matplotlib.pyplot as plt

# Data from the table
radius = [5, 15, 35, 70]
rotation_interval = [4.48, 9.43, 11.21, 16.74]
rpm = [13.39, 6.36, 5.35, 3.58]
speed_of_rotation = [7.00, 12.53, 18.69, 26.45]
angle_to_surface = [63.4, 36.4, 29.1, 20.0]

# Plotting each column
plt.figure(figsize=(12, 8))

# Radius vs Rotation Interval
plt.subplot(2, 2, 1)
plt.plot(radius, rotation_interval, marker='o', linestyle='-', color='g')
plt.xlabel('Radius (meters)')
plt.ylabel('Rotation Interval (seconds)')
plt.title('Radius vs Rotation Interval')
plt.grid(True)

# Radius vs RPM
plt.subplot(2, 2, 2)
plt.plot(radius, rpm, marker='o', linestyle='-', color='r')
plt.xlabel('Radius (meters)')
plt.ylabel('RPM')
plt.title('Radius vs RPM')
plt.grid(True)

# Radius vs Speed of Rotation (m/s)
plt.subplot(2, 2, 3)
plt.plot(radius, speed_of_rotation, marker='o', linestyle='-', color='c')
plt.xlabel('Radius (meters)')
plt.ylabel('Speed of Rotation (m/s)')
plt.title('Radius vs Speed of Rotation (m/s)')
plt.grid(True)

# Radius vs Angle to Surface
plt.subplot(2, 2, 4)
plt.plot(radius, angle_to_surface, marker='o', linestyle='-', color='m')
plt.xlabel('Radius (meters)')
plt.ylabel('Angle to Surface (degrees)')
plt.title('Radius vs Angle to Surface')
plt.grid(True)

# Adjust layout
plt.tight_layout()

# Save the plot as JPG
plt.savefig('moon_gravity_parameters_without_length.jpg', dpi=300)

# Display the plot
plt.show()
