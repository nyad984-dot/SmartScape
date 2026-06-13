package smartscape.core;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Category {
    @JsonProperty("САНТЕХНИКА")
    PLUMBING,
    @JsonProperty("ЭЛЕКТРИКА")
    ELECTRICITY,
    @JsonProperty("ЛИФТ")
    ELEVATOR,
    @JsonProperty("УБОРКА")
    CLEANING,
    @JsonProperty("ДРУГОЕ")
    OTHER
}
