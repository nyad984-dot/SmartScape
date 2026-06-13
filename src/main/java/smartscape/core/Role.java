package smartscape.core;

import com.google.gson.annotations.SerializedName;

public enum Role {
    @SerializedName("Житель")
    CITIZEN,
    @SerializedName("ОСИ")
    OSI,
    @SerializedName("Админка")
    ADMIN
}
